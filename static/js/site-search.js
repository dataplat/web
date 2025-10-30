/**
 * Site-wide full-text search using Fuse.js
 */

class SiteSearch {
  constructor() {
    this.searchData = [];
    this.fuse = null;
    this.searchInput = document.getElementById('site-search-input');
    this.searchButton = document.getElementById('site-search-button');
    this.searchModal = document.getElementById('search-modal');
    this.searchResults = document.getElementById('search-results');
    this.searchClose = document.getElementById('search-close');
    this.searchOverlay = document.getElementById('search-overlay');
    this.resultsCount = document.getElementById('results-count');
    this.debounceTimer = null;
    this.isLoading = false;

    this.setupEventListeners();
  }

  async loadSearchIndex() {
    if (this.isLoading || this.fuse) return;

    this.isLoading = true;
    try {
      // Load search index only when needed
      const response = await fetch('/search.json');
      this.searchData = await response.json();

      // Initialize Fuse.js with optimized settings
      this.fuse = new Fuse(this.searchData, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'summary', weight: 2 },
          { name: 'content', weight: 1 }
        ],
        threshold: 0.3,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        ignoreLocation: true,
        distance: 100
      });
    } catch (error) {
      console.error('Failed to load search index:', error);
    } finally {
      this.isLoading = false;
    }
  }

  setupEventListeners() {
    // Open search modal
    if (this.searchButton) {
      this.searchButton.addEventListener('click', () => this.openModal());
    }

    // Close modal
    if (this.searchClose) {
      this.searchClose.addEventListener('click', () => this.closeModal());
    }

    if (this.searchOverlay) {
      this.searchOverlay.addEventListener('click', () => this.closeModal());
    }

    // Search on input with debouncing
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this.handleSearch(e.target.value), 150);
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openModal();
      }

      // Escape to close
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  async openModal() {
    if (this.searchModal) {
      this.searchModal.classList.remove('hidden');
      this.searchModal.classList.add('flex');
      document.body.style.overflow = 'hidden';

      // Load search index on first open
      if (!this.fuse) {
        await this.loadSearchIndex();
      }

      // Focus input after modal animation
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }, 50);
    }
  }

  closeModal() {
    if (this.searchModal) {
      this.searchModal.classList.add('hidden');
      this.searchModal.classList.remove('flex');
      document.body.style.overflow = '';

      // Clear search
      if (this.searchInput) {
        this.searchInput.value = '';
      }
      if (this.searchResults) {
        this.searchResults.innerHTML = '';
      }
      if (this.resultsCount) {
        this.resultsCount.textContent = '';
      }
    }
  }

  handleSearch(query) {
    if (!this.fuse || !query || query.trim().length < 2) {
      this.searchResults.innerHTML = '';
      this.resultsCount.textContent = '';
      return;
    }

    // Limit search results for better performance
    const results = this.fuse.search(query.trim(), { limit: 30 });
    this.displayResults(results, query);
  }

  displayResults(results, query) {
    if (results.length === 0) {
      this.resultsCount.textContent = 'No results found';
      this.searchResults.innerHTML = `
        <div class="text-center py-12 text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium">No results found for "${this.escapeHtml(query)}"</p>
          <p class="text-sm mt-2">Try adjusting your search terms</p>
        </div>
      `;
      return;
    }

    const totalResults = results.length;
    this.resultsCount.textContent = `${totalResults} result${totalResults !== 1 ? 's' : ''}`;

    const resultsHtml = results.map((result, index) => {
      const item = result.item;
      const score = (1 - result.score) * 100;

      // Get content preview with highlighted matches
      let preview = item.summary || item.content || '';

      // Highlight matching terms
      if (result.matches && result.matches.length > 0) {
        const contentMatch = result.matches.find(m => m.key === 'content' || m.key === 'summary');
        if (contentMatch && contentMatch.value) {
          preview = this.getContextualPreview(contentMatch.value, contentMatch.indices);
        }
      }

      // Type badge color
      const typeColors = {
        'post': 'bg-blue-100 text-blue-800',
        'page': 'bg-green-100 text-green-800',
        'commands': 'bg-purple-100 text-purple-800'
      };
      const typeColor = typeColors[item.type] || 'bg-gray-100 text-gray-800';

      return `
        <a href="${item.permalink}" class="search-result-item block p-4 hover:bg-gray-50 border-b border-gray-200 transition-colors">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColor}">
                  ${this.escapeHtml(item.type)}
                </span>
                ${item.date ? `<span class="text-xs text-gray-500">${this.escapeHtml(item.date)}</span>` : ''}
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600">
                ${this.highlightText(item.title, query)}
              </h3>
              <p class="text-sm text-gray-600 line-clamp-2">
                ${this.highlightText(preview, query)}
              </p>
              ${item.tags && item.tags.length > 0 ? `
                <div class="flex flex-wrap gap-1 mt-2">
                  ${item.tags.slice(0, 3).map(tag => `
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                      ${this.escapeHtml(tag)}
                    </span>
                  `).join('')}
                  ${item.tags.length > 3 ? `<span class="text-xs text-gray-500">+${item.tags.length - 3} more</span>` : ''}
                </div>
              ` : ''}
            </div>
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </a>
      `;
    }).join('');

    this.searchResults.innerHTML = resultsHtml;
  }

  getContextualPreview(text, indices) {
    if (!indices || indices.length === 0) return text.substring(0, 150) + '...';

    // Get context around first match
    const firstMatch = indices[0];
    const start = Math.max(0, firstMatch[0] - 50);
    const end = Math.min(text.length, firstMatch[1] + 100);

    let preview = text.substring(start, end);
    if (start > 0) preview = '...' + preview;
    if (end < text.length) preview = preview + '...';

    return preview;
  }

  highlightText(text, query) {
    if (!query || !text) return this.escapeHtml(text);

    const escapedText = this.escapeHtml(text);
    const terms = query.trim().split(/\s+/).filter(t => t.length >= 2).slice(0, 3); // Limit to first 3 terms
    let highlighted = escapedText;

    // Use simple string replace for better performance
    terms.forEach(term => {
      const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });

    return highlighted;
  }

  escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, (char) => {
      const escapeChars = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      return escapeChars[char];
    });
  }

  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new SiteSearch());
} else {
  new SiteSearch();
}
