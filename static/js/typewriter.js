// Migration animation for hero terminal
(function() {
  const progressBar = document.getElementById('progress-bar');
  const progressEmpty = document.getElementById('progress-empty');
  const migrationItems = document.getElementById('migration-items');
  const progressBox = document.getElementById('progress-box');

  if (!progressBar || !progressEmpty || !migrationItems) return;

  // Use config from Hugo (set in hero.html) or fallback to defaults
  const config = window.heroTerminalConfig || {
    animatedItems: [
      { type: 'Database', name: 'Northwind' },
      { type: 'Database', name: 'pubs' }
    ],
    timing: {
      item_delay: 5000,
      start_delay: 2000,
      reset_delay: 5000
    },
    progressBar: {
      initial_fill: 'oooooooooooooooo',
      fill_per_item: 'oooo',
      total_width: 65
    }
  };

  const items = config.animatedItems;
  const itemDelay = config.timing.item_delay;
  const startDelay = config.timing.start_delay;
  const resetDelay = config.timing.reset_delay;
  const initialProgress = config.progressBar.initial_fill;
  const fillPerItem = config.progressBar.fill_per_item;
  const totalWidth = config.progressBar.total_width;
  const initialSpaces = ' '.repeat(totalWidth - initialProgress.length);

  let currentIndex = 0;

  function showNextItem() {
    const item = items[currentIndex];

    // Add the item to the list
    const itemLine = document.createElement('span');
    itemLine.className = 'text-[#46BDFF]';
    itemLine.textContent = `${item.type.padEnd(34)}${item.name}\n`;
    migrationItems.appendChild(itemLine);

    // Add progress to progress bar
    progressBar.textContent += fillPerItem;
    const currentSpaces = progressEmpty.textContent;
    if (currentSpaces.length >= fillPerItem.length) {
      progressEmpty.textContent = currentSpaces.slice(fillPerItem.length);
    }

    // Move to next item
    currentIndex++;

    // If we've shown all items, reset after a delay
    if (currentIndex >= items.length) {
      setTimeout(function() {
        // Clear the items
        migrationItems.innerHTML = '';
        // Reset progress bar
        progressBar.textContent = initialProgress;
        progressEmpty.textContent = initialSpaces;
        // Reset counter
        currentIndex = 0;
        // Start again
        setTimeout(showNextItem, itemDelay);
      }, resetDelay);
    } else {
      // Continue with next item
      setTimeout(showNextItem, itemDelay);
    }
  }

  // Start animation after delay
  setTimeout(showNextItem, startDelay);
})();

// Copy install command functionality
function copyInstallCommand() {
  const commandText = 'Install-Module dbatools';

  // Use the Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(commandText).then(function() {
      showCopyFeedback();
    }).catch(function(err) {
      console.error('Failed to copy: ', err);
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = commandText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showCopyFeedback();
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    document.body.removeChild(textArea);
  }
}

function showCopyFeedback() {
  const button = event.target.closest('button');
  const originalHTML = button.innerHTML;

  // Show checkmark icon
  button.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
  button.classList.add('opacity-100');

  // Reset after 2 seconds
  setTimeout(function() {
    button.innerHTML = originalHTML;
  }, 2000);
}
