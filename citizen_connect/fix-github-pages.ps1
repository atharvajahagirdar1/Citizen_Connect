# 🧹 Cleaning up node_modules from Git repository
Write-Host "🧹 Cleaning up node_modules from Git repository..." -ForegroundColor Yellow
Write-Host ""

# Remove node_modules from Git tracking (but keep files locally)
git rm -r --cached "Admin UI/node_modules" 2>$null
git rm -r --cached "node_modules" 2>$null

# Remove package-lock.json from Git tracking
git rm --cached "Admin UI/package-lock.json" 2>$null
git rm --cached "package-lock.json" 2>$null

Write-Host "✅ Removed node_modules from Git tracking" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Updating .gitignore to prevent future commits..." -ForegroundColor Yellow
Write-Host ""

# Add specific exclusions to .gitignore
Add-Content -Path ".gitignore" -Value "`n# GitHub Pages specific exclusions"
Add-Content -Path ".gitignore" -Value "**/node_modules/"
Add-Content -Path ".gitignore" -Value "**/package-lock.json"
Add-Content -Path ".gitignore" -Value "**/*.md"
Add-Content -Path ".gitignore" -Value "!README.md"

Write-Host "🎯 Committing changes..." -ForegroundColor Yellow

# Stage the changes
git add .gitignore
git commit -m "Fix GitHub Pages: Remove node_modules from tracking and update .gitignore" 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Changes committed successfully!" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No changes to commit or commit failed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Ready to push to GitHub!" -ForegroundColor Green
Write-Host "Run: git push origin main"
Write-Host ""
Write-Host "After pushing, GitHub Pages should build successfully!" -ForegroundColor Cyan