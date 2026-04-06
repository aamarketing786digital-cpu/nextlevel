$files = Get-ChildItem -Path "src" -Recurse -Include *.tsx,*.ts,*.css
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'amber') {
        $newContent = $content -replace 'amber', 'orange'
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}
Write-Host "Done!"
