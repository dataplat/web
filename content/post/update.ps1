$content = Get-Content 'dedicated-server.md' -Raw
$content = $content -replace '## Using dbatools to automate tests', '## Using dbatools to Automate Tests'
$content = $content -replace '## First, centralize your SQL Server backups', '## First, Centralize Your SQL Server Backups'
$content = $content -replace '## Next, build your server', '## Next, Build Your Server'
$content = $content -replace '#### Service account', '#### Service Account'
$content = $content -replace '#### tempdb', '#### Tempdb'
$content = $content -replace '## Execute a one-liner', '## Execute a One-Liner'
$content = $content -replace '## The output!', '## The Output!'
$content = $content -replace 'https://dbatools.io/wp-content/uploads/2017/04/img_58ecf0fbd28d9.png\?w=800&ssl=1', '/images/img_58ecf0fbd28d9.png'
$content = $content -replace 'https://dbatools.io/wp-content/uploads/2017/04/img_58ecf0fbd28d9-full.png\?ssl=1', '/images/img_58ecf0fbd28d9-full.png'
$content | Set-Content 'dedicated-server.md' -Encoding UTF8
