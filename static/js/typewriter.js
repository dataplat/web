// Migration animation for hero terminal
(function() {
  const progressBar = document.getElementById('progress-bar');
  const progressEmpty = document.getElementById('progress-empty');
  const migrationItems = document.getElementById('migration-items');

  if (!progressBar || !progressEmpty || !migrationItems) return;

  const databases = [
    { type: 'Database', name: 'Northwind' },
    { type: 'Database', name: 'pubs' }
  ];

  let currentDB = 0;
  const itemDelay = 5000; // 5 seconds between items
  const startDelay = 2000; // 2 seconds before starting
  const initialProgress = 'oooooooooooooooo';
  const initialSpaces = '                                                 ';

  function showNextDatabase() {
    const db = databases[currentDB];

    // Add the database to the list
    const itemLine = document.createElement('span');
    itemLine.className = 'text-[#46BDFF]';
    itemLine.textContent = `${db.type.padEnd(34)}${db.name}\n`;
    migrationItems.appendChild(itemLine);

    // Add 'oooo' to progress bar
    progressBar.textContent += 'oooo';
    const currentSpaces = progressEmpty.textContent;
    if (currentSpaces.length >= 4) {
      progressEmpty.textContent = currentSpaces.slice(4);
    }

    // Move to next database
    currentDB++;

    // If we've shown both databases, reset after a delay
    if (currentDB >= databases.length) {
      setTimeout(function() {
        // Clear the items
        migrationItems.innerHTML = '';
        // Reset progress bar
        progressBar.textContent = initialProgress;
        progressEmpty.textContent = initialSpaces;
        // Reset counter
        currentDB = 0;
        // Start again
        setTimeout(showNextDatabase, itemDelay);
      }, itemDelay);
    } else {
      // Continue with next database
      setTimeout(showNextDatabase, itemDelay);
    }
  }

  // Start animation after delay
  setTimeout(showNextDatabase, startDelay);
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
