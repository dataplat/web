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
    this.reportTimer = null;
    this.lastReported = '';
    this.lastQuery = '';
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
        this.reportSearch(e.target.value);
      });
    }

    // Result clicks. displayResults() replaces the container's innerHTML on
    // every keystroke, so listeners bound to the anchors themselves would be
    // thrown away with the markup that carried them. One listener on the
    // container survives, and closest() recovers the result that was clicked.
    if (this.searchResults) {
      this.searchResults.addEventListener('click', (e) => this.handleResultClick(e));
      // Middle-click opens a link in a new tab but fires auxclick, not click.
      this.searchResults.addEventListener('auxclick', (e) => this.handleResultClick(e));
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

  /**
   * Report a search to GA4 once typing stops.
   *
   * The 150ms debounce above is for rendering; reporting on that cadence would
   * send "b", "ba", "bac" as three searches. This waits for a real pause, skips
   * a repeat, and skips backspacing over a term already sent, so what lands in
   * the search_term report is roughly what somebody meant to ask.
   *
   * gtag is absent whenever the tag is blocked, so it is checked rather than
   * assumed - a missing analytics script must never break search.
   */
  reportSearch(query) {
    clearTimeout(this.reportTimer);
    const term = (query || '').trim().toLowerCase();
    if (term.length < 3) return;

    this.reportTimer = setTimeout(() => {
      if (typeof gtag !== 'function') return;
      if (term === this.lastReported) return;
      if (this.lastReported.startsWith(term)) return;
      this.lastReported = term;
      gtag('event', 'search', { search_term: term });
    }, 1200);
  }

  /**
   * Turn a click anywhere inside the results list into a click on a result.
   *
   * The target is usually a heading or a badge rather than the anchor, so
   * closest() walks up to the result that owns it. Anything else in the
   * container - padding, the empty state - matches nothing and is ignored.
   */
  handleResultClick(event) {
    // auxclick covers every non-primary button; only the middle one opens the
    // link. The right button raises a context menu and is not a click-through.
    if (event.type === 'auxclick' && event.button !== 1) return;

    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;

    const link = target.closest('.search-result-item');
    if (!link) return;

    this.reportResultClick(link);
  }

  /**
   * Report which result a search sent somebody to, so search_term reporting
   * shows more than what people asked - it shows whether they found it.
   *
   * Navigation is never intercepted, so a slow or blocked tag cannot hold the
   * link up. Nothing is lost by letting it go: gtag.js transports hits with
   * navigator.sendBeacon, which the browser keeps in flight across the unload,
   * and it flushes anything queued on pagehide. Middle-click and Cmd/Ctrl+click
   * open a new tab without unloading this one at all.
   *
   * gtag is checked rather than assumed, same as reportSearch - a missing
   * analytics script must never take the link with it.
   */
  reportResultClick(link) {
    if (typeof gtag !== 'function') return;

    const term = (this.lastQuery || '').trim().toLowerCase();
    if (!term) return;

    gtag('event', 'search_result_click', {
      search_term: term,
      link_url: link.getAttribute('href') || '',
      result_position: Number(link.getAttribute('data-search-position')) || 0
    });
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
    // The query these results answer, kept for reportResultClick - by the time
    // somebody clicks, the input may hold something else entirely.
    this.lastQuery = query;

    if (results.length === 0) {
      this.resultsCount.textContent = 'No results found';
      this.searchResults.innerHTML = `
        <div class="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium text-gray-900 dark:text-gray-100">No results found for "${this.escapeHtml(query)}"</p>
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
        'post': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'page': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        'commands': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      };
      const typeColor = typeColors[item.type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

      return `
        <a href="${item.permalink}" data-search-position="${index + 1}" class="search-result-item block p-4 border-b border-gray-200 dark:border-gray-700 transition-colors">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColor}">
                  ${this.escapeHtml(item.type)}
                </span>
                ${item.date ? `<span class="text-xs text-gray-500 dark:text-gray-400">${this.escapeHtml(item.date)}</span>` : ''}
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 hover:text-blue-600 dark:hover:text-blue-400">
                ${this.highlightText(item.title, query)}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                ${this.highlightText(preview, query)}
              </p>
              ${item.tags && item.tags.length > 0 ? `
                <div class="flex flex-wrap gap-1 mt-2">
                  ${item.tags.slice(0, 3).map(tag => `
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      ${this.escapeHtml(tag)}
                    </span>
                  `).join('')}
                  ${item.tags.length > 3 ? `<span class="text-xs text-gray-500 dark:text-gray-400">+${item.tags.length - 3} more</span>` : ''}
                </div>
              ` : ''}
            </div>
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
