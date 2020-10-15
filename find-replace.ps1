Function Find-Web ($str) {
 Select-String -Pattern $str -Path (Get-ChildItem C:\github\web\*.html -Recurse)
}


$files = Get-ChildItem *.jpg, *.png, *.gif -Recurse
foreach ($file in $files) {
    $results = Find-Web $file.Name
    if (-not $results) {
        $file | Remove-Item -Force
        Write-Warning "Removed $file"
    } else {
        "Found $file"
    }
}