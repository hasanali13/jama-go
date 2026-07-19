# Deploy Jama Go Security to Hostinger VPS (jamago.qa)
# Usage: powershell -ExecutionPolicy Bypass -File scripts/deploy.ps1

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root "dist\jamago-security\browser"
$remote = "root@76.13.133.53:/var/www/jamago.qa/"
$nodeExe = Join-Path $root ".tools\node\node.exe"
$runWithNode = Join-Path $root "scripts\run-with-node.mjs"

Set-Location $root

if (-not (Test-Path $nodeExe)) {
  Write-Host "Local Node is missing. Installing..." -ForegroundColor Yellow
  $tools = Join-Path $root ".tools"
  $version = "v26.5.0"
  $zip = Join-Path $tools "node-$version-win-x64.zip"
  $target = Join-Path $tools "node"
  New-Item -ItemType Directory -Force -Path $tools | Out-Null
  Invoke-WebRequest -Uri "https://nodejs.org/dist/$version/node-$version-win-x64.zip" -OutFile $zip
  Expand-Archive -Path $zip -DestinationPath (Join-Path $tools "extract") -Force
  $extracted = Get-ChildItem (Join-Path $tools "extract") -Directory | Select-Object -First 1
  if (Test-Path $target) { Remove-Item $target -Recurse -Force }
  Move-Item $extracted.FullName $target
  Set-Content (Join-Path $tools "node-version.txt") $version
  Remove-Item $zip -Force -ErrorAction SilentlyContinue
  Remove-Item (Join-Path $tools "extract") -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Building production bundle..." -ForegroundColor Cyan
& $nodeExe $runWithNode npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (-not (Test-Path (Join-Path $dist "index.html"))) {
  Write-Error "Build output not found at $dist"
}

Write-Host ""
Write-Host "Uploading to $remote" -ForegroundColor Cyan
Write-Host "Enter your VPS root password when prompted." -ForegroundColor Yellow
Write-Host ""

scp -o StrictHostKeyChecking=accept-new -r "$dist\*" $remote
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Upload complete. Fixing permissions on server..." -ForegroundColor Cyan
ssh root@76.13.133.53 "chown -R www-data:www-data /var/www/jamago.qa && chmod -R 755 /var/www/jamago.qa && ls -la /var/www/jamago.qa"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Deployed! Open https://jamago.qa and hard-refresh (Ctrl+Shift+R)." -ForegroundColor Green
