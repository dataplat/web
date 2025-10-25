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
