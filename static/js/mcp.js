/* Client tabs and copy buttons for the /mcp install widget.
   No dependencies. The chosen client is remembered, since anyone who comes back to
   this page is almost certainly still using the same editor. */

(function () {
  'use strict';

  var STORAGE_KEY = 'dbatools-mcp-client';

  function init(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-mcp-tab]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[data-mcp-panel]'));
    if (!tabs.length) return;

    /* Nothing is mutated until the id is known to exist, so a stale value from
       storage leaves the widget exactly as the server rendered it. */
    function select(id, focus) {
      var known = tabs.some(function (tab) {
        return tab.getAttribute('data-mcp-tab') === id;
      });
      if (!known) return false;

      tabs.forEach(function (tab) {
        var active = tab.getAttribute('data-mcp-tab') === id;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.tabIndex = active ? 0 : -1;
        if (active && focus) tab.focus();
      });

      panels.forEach(function (panel) {
        var active = panel.getAttribute('data-mcp-panel') === id;
        panel.classList.toggle('is-active', active);
        if (active) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });

      return true;
    }

    /* Deliberate choices are remembered; the restore on load is not re-saved. */
    function choose(id, focus) {
      if (!select(id, focus)) return;
      try {
        window.localStorage.setItem(STORAGE_KEY, id);
      } catch (err) {
        /* Private browsing or a full quota. The tab still switched. */
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        choose(tab.getAttribute('data-mcp-tab'), false);
      });

      tab.addEventListener('keydown', function (event) {
        var step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        var next = tabs[(index + step + tabs.length) % tabs.length];
        choose(next.getAttribute('data-mcp-tab'), true);
      });
    });

    /* Restore the last client, if that tab still exists. Never steals focus:
       this runs on load and the reader has not asked to be moved anywhere. */
    var remembered;
    try {
      remembered = window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      remembered = null;
    }
    if (remembered) select(remembered, false);
  }

  function wireCopy(button) {
    var block = button.parentElement && button.parentElement.querySelector('code');
    if (!block) return;

    button.addEventListener('click', function () {
      var done = function (label, ok) {
        button.textContent = label;
        button.classList.toggle('is-copied', ok);
        window.setTimeout(function () {
          button.textContent = 'Copy';
          button.classList.remove('is-copied');
        }, 2000);
      };

      var text = block.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { done('Copied', true); },
          function () { done('Press Ctrl+C', false); }
        );
        return;
      }

      /* No clipboard API - typically an insecure origin, which includes plain
         http://localhost previews of this site. */
      done('Press Ctrl+C', false);
    });
  }

  function ready() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-mcp-install]'), init);
    Array.prototype.forEach.call(document.querySelectorAll('[data-mcp-copy]'), wireCopy);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
  } else {
    ready();
  }
})();
