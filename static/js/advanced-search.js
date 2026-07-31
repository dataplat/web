/**
 * Advanced Search Page - Full-text search with URL query parameter support
 */

class AdvancedSearch {
  constructor() {
    this.searchData = [];
    this.fuse = null;
    this.searchInput = document.getElementById('advanced-search-input');
    this.searchResults = document.getElementById('advanced-search-results');
    this.resultsCount = document.getElementById('advanced-results-count');
    this.initialState = document.getElementById('search-initial-state');
    this.debounceTimer = null;
    this.reportTimer = null;
    this.lastReported = '';
    this.lastQuery = '';
    this.isLoading = false;

    this.init();
  }

  async init() {
    await this.loadSearchIndex();
    this.setupEventListeners();
    this.checkUrlQuery();
  }

  async loadSearchIndex() {
    if (this.isLoading || this.fuse) return;

    this.isLoading = true;
    try {
      const response = await fetch('/search.json');
      this.searchData = await response.json();

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
      this.showError('Failed to load search index. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  setupEventListeners() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
          this.handleSearch(e.target.value);
          this.updateUrl(e.target.value);
        }, 150);
        this.reportSearch(e.target.value);
      });

      // Focus input on page load
      this.searchInput.focus();
    }

    // Result clicks. displayResults() replaces the container's innerHTML on
    // every keystroke, so listeners bound to the cards themselves would be
    // thrown away with the markup that carried them. One listener on the
    // container survives, and closest() recovers the card that was clicked.
    if (this.searchResults) {
      this.searchResults.addEventListener('click', (e) => this.handleResultClick(e));
      // Middle-click opens a link in a new tab but fires auxclick, not click.
      this.searchResults.addEventListener('auxclick', (e) => this.handleResultClick(e));
    }

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.checkUrlQuery();
    });
  }

  checkUrlQuery() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');

    if (query && this.searchInput) {
      this.searchInput.value = query;
      this.handleSearch(query);
      // A search nobody typed here - a shared or bookmarked ?q= link, or the
      // back button. It counts the same as one typed into the box, and
      // nothing else reports it.
      this.reportSearch(query);
    }
  }

  updateUrl(query) {
    const url = new URL(window.location);
    if (query && query.trim().length >= 2) {
      url.searchParams.set('q', query.trim());
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  }

  /**
   * Report a search to GA4 once typing stops. Same reasoning as site-search.js:
   * the 150ms debounce renders results, this one waits for a real pause so the
   * search_term report holds questions rather than keystrokes.
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
   * closest() walks up to the card that owns it. Anything else in the
   * container - the initial state, the empty state - matches nothing.
   */
  handleResultClick(event) {
    // auxclick covers every non-primary button; only the middle one opens the
    // link. The right button raises a context menu and is not a click-through.
    if (event.type === 'auxclick' && event.button !== 1) return;

    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;

    const link = target.closest('.search-result-card');
    if (!link) return;

    this.reportResultClick(link);
  }

  /**
   * Report which result a search sent somebody to. Same reasoning as
   * site-search.js: navigation is never intercepted, so a slow or blocked tag
   * cannot hold the link up, and nothing is lost by letting it go - gtag.js
   * transports hits with navigator.sendBeacon, which survives the unload, and
   * flushes what is queued on pagehide. Middle-click and Cmd/Ctrl+click open a
   * new tab without unloading this page at all.
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
    if (!this.fuse) {
      return;
    }

    if (!query || query.trim().length < 2) {
      this.showInitialState();
      this.resultsCount.textContent = '';
      return;
    }

    const results = this.fuse.search(query.trim(), { limit: 50 });
    this.displayResults(results, query);
  }

  showInitialState() {
    if (this.initialState) {
      this.initialState.style.display = 'block';
    }
    // Clear any results except initial state
    const results = this.searchResults.querySelectorAll('.search-result-card');
    results.forEach(r => r.remove());
    const noResults = this.searchResults.querySelector('.no-results');
    if (noResults) noResults.remove();
  }

  showError(message) {
    this.searchResults.innerHTML = `
      <div class="text-center py-12 text-red-500 dark:text-red-400">
        <svg class="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <p class="text-lg font-medium">${this.escapeHtml(message)}</p>
      </div>
    `;
  }

  displayResults(results, query) {
    // The query these results answer, kept for reportResultClick - by the time
    // somebody clicks, the input may hold something else entirely.
    this.lastQuery = query;

    // Hide initial state
    if (this.initialState) {
      this.initialState.style.display = 'none';
    }

    if (results.length === 0) {
      this.resultsCount.textContent = 'No results found';
      this.searchResults.innerHTML = `
        <div class="no-results text-center py-12 text-gray-500 dark:text-gray-400">
          <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium text-gray-900 dark:text-gray-100">No results found for "${this.escapeHtml(query)}"</p>
          <p class="text-sm mt-2">Try adjusting your search terms or using different keywords</p>
        </div>
      `;
      return;
    }

    const totalResults = results.length;
    this.resultsCount.textContent = `${totalResults} result${totalResults !== 1 ? 's' : ''}`;

    const resultsHtml = results.map((result, index) => {
      const item = result.item;

      // Get content preview with highlighted matches
      let preview = item.summary || item.content || '';

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
        <a href="${item.permalink}" data-search-position="${index + 1}" class="search-result-card block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColor}">
                  ${this.escapeHtml(item.type)}
                </span>
                ${item.date ? `<span class="text-xs text-gray-500 dark:text-gray-400">${this.escapeHtml(item.date)}</span>` : ''}
              </div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-primary dark:hover:text-blue-400 transition-colors">
                ${this.highlightText(item.title, query)}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                ${this.highlightText(preview, query)}
              </p>
              ${item.tags && item.tags.length > 0 ? `
                <div class="flex flex-wrap gap-1.5">
                  ${item.tags.slice(0, 5).map(tag => `
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      ${this.escapeHtml(tag)}
                    </span>
                  `).join('')}
                  ${item.tags.length > 5 ? `<span class="text-xs text-gray-500 dark:text-gray-400">+${item.tags.length - 5} more</span>` : ''}
                </div>
              ` : ''}
            </div>
            <div class="flex-shrink-0 mt-1">
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
    if (!indices || indices.length === 0) return text.substring(0, 200) + '...';

    const firstMatch = indices[0];
    const start = Math.max(0, firstMatch[0] - 75);
    const end = Math.min(text.length, firstMatch[1] + 150);

    let preview = text.substring(start, end);
    if (start > 0) preview = '...' + preview;
    if (end < text.length) preview = preview + '...';

    return preview;
  }

  highlightText(text, query) {
    if (!query || !text) return this.escapeHtml(text);

    const escapedText = this.escapeHtml(text);
    const terms = query.trim().split(/\s+/).filter(t => t.length >= 2).slice(0, 5);
    let highlighted = escapedText;

    terms.forEach(term => {
      const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-100 px-0.5 rounded">$1</mark>');
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new AdvancedSearch());
} else {
  new AdvancedSearch();
}
