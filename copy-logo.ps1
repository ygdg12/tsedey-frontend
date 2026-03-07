# Copy the logo image from Cursor assets into the project.
# Run from the project root: .\copy-logo.ps1
$assetsDir = "$env:USERPROFILE\.cursor\projects\c-Users-yared-Desktop-Projects-summit2\assets"
$dest = ".\public\tsedey-logo.png"
if (Test-Path $assetsDir) {
  $png = Get-ChildItem -Path $assetsDir -Filter "*.png" -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($png) {
    Copy-Item -LiteralPath $png.FullName -Destination $dest -Force
    Write-Host "Logo copied to $dest"
  } else {
    Write-Host "No PNG found in $assetsDir - please copy your logo image to public\tsedey-logo.png"
  }
} else {
  Write-Host "Assets folder not found. Please copy your logo image to public\tsedey-logo.png"
}
