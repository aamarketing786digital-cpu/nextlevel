$files = Get-ChildItem -Path "src" -Recurse -Include *.tsx,*.ts
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $changed = $false
    
    # Replace cyan color classes with teal (but not cyan-glow which is a custom token)
    if ($content -match 'cyan-5') {
        $newContent = $content -replace 'cyan-500', 'teal-500' -replace 'cyan-5/', 'teal-5/'
        $content = $newContent
        $changed = $true
    }
    
    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Done!"
