/**
 * dbatools Commands Page
 * Instant search, filtering, and categorization for 700+ PowerShell commands
 */

class CommandsBrowser {
  constructor() {
    this.allCommands = [];
    this.filteredCommands = [];
    this.fuse = null;
    this.categories = new Set();
    this.actions = new Set();
    this.activeCategory = 'all';
    this.activeAction = 'all';
    this.activeSort = 'alphabetical';
    this.showPopularOnly = false;
    this.searchQuery = '';
    this.recentSearches = [];

    this.init();
  }

  async init() {
    await this.loadCommands();
    this.extractMetadata();
    this.setupFuse();
    this.renderFilters();
    this.setupEventListeners();
    this.loadURLParams();
    this.render();
  }

  async loadCommands() {
    try {
      const response = await fetch('/commands.json');
      this.allCommands = await response.json();
      console.log(`Loaded ${this.allCommands.length} commands`);
    } catch (error) {
      console.error('Error loading commands:', error);
      this.showError('Failed to load commands. Please refresh the page.');
    }
  }

  extractMetadata() {
    this.allCommands.forEach(cmd => {
      this.categories.add(cmd.category);
      this.actions.add(cmd.verb);
    });
  }

  setupFuse() {
    const fuseOptions = {
      keys: [
        { name: 'name', weight: 3 },
        { name: 'description', weight: 2 },
        { name: 'tags', weight: 1.5 },
        { name: 'verb', weight: 1 },
        { name: 'category', weight: 1 }
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 1,
      shouldSort: true
    };

    this.fuse = new Fuse(this.allCommands, fuseOptions);
  }

  renderFilters() {
    // Render categories (same style as actions)
    const categoriesList = document.getElementById('categories-list');
    const sortedCategories = Array.from(this.categories).sort();

    // Clear the list first
    categoriesList.innerHTML = '';

    // Add "All Commands" first
    const allCategoryDiv = document.createElement('div');
    allCategoryDiv.className = 'category-item active';
    allCategoryDiv.dataset.category = 'all';
    allCategoryDiv.innerHTML = `
      <span>All Commands</span>
      <span class="filter-count">${this.allCommands.length}</span>
    `;
    allCategoryDiv.addEventListener('click', () => this.selectCategory('all'));
    categoriesList.appendChild(allCategoryDiv);

    // Add individual categories
    sortedCategories.forEach(category => {
      const count = this.allCommands.filter(cmd => cmd.category === category).length;
      const div = document.createElement('div');
      div.className = 'category-item';
      div.dataset.category = category;
      div.innerHTML = `
        <span>${category}</span>
        <span class="filter-count">${count}</span>
      `;
      div.addEventListener('click', () => this.selectCategory(category));
      categoriesList.appendChild(div);
    });

    // Render actions
    const actionsList = document.getElementById('actions-list');
    const sortedActions = Array.from(this.actions).sort();

    // Add "All Actions" first
    const allActionsDiv = document.createElement('div');
    allActionsDiv.className = 'action-item active';
    allActionsDiv.dataset.action = 'all';
    allActionsDiv.innerHTML = `
      <span>All Actions</span>
      <span class="filter-count">${this.allCommands.length}</span>
    `;
    allActionsDiv.addEventListener('click', () => this.selectAction('all'));
    actionsList.appendChild(allActionsDiv);

    // Add individual actions
    sortedActions.forEach(action => {
      const count = this.allCommands.filter(cmd => cmd.verb === action).length;
      const div = document.createElement('div');
      div.className = 'action-item';
      div.dataset.action = action;
      div.innerHTML = `
        <span>${action}</span>
        <span class="filter-count">${count}</span>
      `;
      div.addEventListener('click', () => this.selectAction(action));
      actionsList.appendChild(div);
    });
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => this.handleSearch(e));
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch();
      }
    });

    // Clear search button
    document.getElementById('clear-search').addEventListener('click', () => this.clearSearch());

    // Popular button
    document.getElementById('popular-filter-btn').addEventListener('click', () => this.togglePopularFilter());

    // Sort dropdown
    document.getElementById('sort-select').addEventListener('change', (e) => this.handleSortChange(e));

    // Reset button
    document.getElementById('reset-filters').addEventListener('click', () => this.resetAllFilters());

    // Keyboard shortcut: / to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  handleSearch(e) {
    this.searchQuery = e.target.value.trim();
    this.updateSearchUI();
    this.applyAllFilters();
  }

  clearSearch() {
    this.searchQuery = '';
    document.getElementById('search-input').value = '';
    this.updateSearchUI();
    this.applyAllFilters();
  }

  updateSearchUI() {
    const clearBtn = document.getElementById('clear-search');
    if (this.searchQuery) {
      clearBtn.classList.add('visible');
    } else {
      clearBtn.classList.remove('visible');
    }
  }

  selectCategory(category) {
    this.activeCategory = category;

    // Update UI
    document.querySelectorAll('.category-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.category === category) {
        item.classList.add('active');
      }
    });

    this.updateURLParams();
    this.applyAllFilters();
  }

  selectAction(action) {
    this.activeAction = action;

    // Update UI
    document.querySelectorAll('.action-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.action === action) {
        item.classList.add('active');
      }
    });

    this.updateURLParams();
    this.applyAllFilters();
  }

  handleSortChange(e) {
    this.activeSort = e.target.value;

    // Ensure popularity note is only shown when Popular Commands filter is active
    const popularityNote = document.getElementById('popularity-note');
    if (popularityNote) {
      if (this.showPopularOnly) {
        popularityNote.classList.add('show');
      } else {
        popularityNote.classList.remove('show');
      }
    }

    this.render();
  }

  togglePopularFilter() {
    this.showPopularOnly = !this.showPopularOnly;
    const btn = document.getElementById('popular-filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const popularityNote = document.getElementById('popularity-note');

    if (this.showPopularOnly) {
      btn.classList.add('active');
      // Auto-select "Popular First" sorting
      this.activeSort = 'popular';
      sortSelect.value = 'popular';
      popularityNote.classList.add('show');
    } else {
      btn.classList.remove('active');
      popularityNote.classList.remove('show');
    }

    this.applyAllFilters();
  }

  applyAllFilters() {
    let results = this.allCommands;

    // Apply category filter
    if (this.activeCategory !== 'all') {
      results = results.filter(cmd => cmd.category === this.activeCategory);
    }

    // Apply action filter
    if (this.activeAction !== 'all') {
      results = results.filter(cmd => cmd.verb === this.activeAction);
    }

    // Apply popular filter
    if (this.showPopularOnly) {
      results = results.filter(cmd => cmd.popular);
    }

    // Apply search
    if (this.searchQuery) {
      const searchResults = this.fuse.search(this.searchQuery);
      const searchResultIds = new Set(searchResults.map(r => r.item.name));
      results = results.filter(cmd => searchResultIds.has(cmd.name));
    }

    this.filteredCommands = results;
    this.render();
  }

  render() {
    const grid = document.getElementById('commands-grid');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');

    // Sort commands
    const sorted = this.sortCommands([...this.filteredCommands]);

    resultsCount.textContent = sorted.length;

    if (sorted.length === 0) {
      grid.style.display = 'none';
      noResults.classList.remove('hidden');
      return;
    }

    grid.style.display = 'grid';
    noResults.classList.add('hidden');

    grid.innerHTML = sorted.map(cmd => this.createCommandCard(cmd)).join('');

    // Add click handlers
    document.querySelectorAll('.command-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const url = card.dataset.url;
        window.location.href = url;
      });
    });
  }

  createCommandCard(cmd) {
    const popular = cmd.popular ? '⭐' : '';
    const tags = cmd.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');

    return `
      <a
        href="${cmd.url}"
        class="command-card"
        data-url="${cmd.url}"
        title="View ${cmd.name} documentation"
      >
        <div class="command-card-header">
          <h3 class="command-name">${this.highlightMatch(cmd.name)}</h3>
          <span class="command-popular">${popular}</span>
        </div>
        <p class="command-description">${this.highlightMatch(cmd.description)}</p>
        <div class="command-tags">${tags}</div>
        <div class="command-category">Category: ${cmd.category}</div>
      </a>
    `;
  }

  highlightMatch(text) {
    if (!this.searchQuery) return text;

    const query = this.searchQuery.toLowerCase();
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  sortCommands(commands) {
    const sorted = [...commands];

    switch (this.activeSort) {
      case 'alphabetical':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'popular':
        sorted.sort((a, b) => {
          // Sort by popularityRank (lower rank = more popular)
          if (a.popular && b.popular) {
            return a.popularityRank - b.popularityRank;
          }
          // Popular commands come first
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          // Both non-popular, sort alphabetically
          return a.name.localeCompare(b.name);
        });
        break;

      case 'category':
        sorted.sort((a, b) => {
          if (a.category === b.category) {
            return a.name.localeCompare(b.name);
          }
          return a.category.localeCompare(b.category);
        });
        break;
    }

    return sorted;
  }

  updateURLParams() {
    const params = new URLSearchParams();

    if (this.activeCategory !== 'all') {
      params.set('category', this.sanitizeValue(this.activeCategory));
    }

    if (this.activeAction !== 'all') {
      params.set('action', this.sanitizeValue(this.activeAction));
    }

    if (this.showPopularOnly) {
      params.set('popular', 'true');
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }

  loadURLParams() {
    const params = new URLSearchParams(window.location.search);

    // Load search query
    const search = params.get('search');
    if (search) {
      this.searchQuery = search;
      document.getElementById('search-input').value = search;
      this.updateSearchUI();
    }

    // Load category
    const category = params.get('category');
    if (category) {
      const actualCategory = Array.from(this.categories).find(
        cat => this.sanitizeValue(cat) === category
      );
      if (actualCategory) {
        this.selectCategory(actualCategory);
      }
    }

    // Load action
    const action = params.get('action');
    if (action) {
      const actualAction = Array.from(this.actions).find(
        a => this.sanitizeValue(a) === action
      );
      if (actualAction) {
        this.selectAction(actualAction);
      }
    }

    // Load popular filter
    if (params.get('popular') === 'true' || params.get('popular') === '1') {
      this.showPopularOnly = true;
      document.getElementById('popular-filter-btn').classList.add('active');
    }

    this.applyAllFilters();
  }

  resetAllFilters() {
    this.searchQuery = '';
    this.activeCategory = 'all';
    this.activeAction = 'all';
    this.showPopularOnly = false;

    document.getElementById('search-input').value = '';
    this.selectCategory('all');
    this.selectAction('all');
    document.getElementById('popular-filter-btn').classList.remove('active');
    document.getElementById('sort-select').value = 'alphabetical';
    this.activeSort = 'alphabetical';

    this.updateSearchUI();
    this.updateURLParams();
    this.applyAllFilters();
  }

  sanitizeValue(text) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and');
  }

  showError(message) {
    const grid = document.getElementById('commands-grid');
    grid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1;">
        <p class="no-results-text">Error</p>
        <p class="no-results-hint">${message}</p>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CommandsBrowser();
});
