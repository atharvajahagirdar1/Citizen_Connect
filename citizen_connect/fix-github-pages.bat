@echo off
echo 🧹 Cleaning up node_modules from Git repository...
echo.

REM Remove node_modules from Git tracking (but keep files locally)
git rm -r --cached "Admin UI/node_modules" 2>nul
git rm -r --cached "node_modules" 2>nul

REM Remove package-lock.json from Git tracking
git rm --cached "Admin UI/package-lock.json" 2>nul
git rm --cached "package-lock.json" 2>nul

echo ✅ Removed node_modules from Git tracking
echo.
echo 📝 Updating .gitignore to prevent future commits...
echo.
REM Add specific exclusions to .gitignore
echo # GitHub Pages specific exclusions >> .gitignore
echo **/node_modules/ >> .gitignore
echo **/package-lock.json >> .gitignore
echo **/*.md >> .gitignore
echo !README.md >> .gitignore
echo.
echo 🎯 Committing changes...
git add .gitignore
git commit -m "Fix GitHub Pages: Remove node_modules from tracking and update .gitignore" || echo No changes to commit
echo.
echo 🚀 Ready to push to GitHub!
echo Run: git push origin main
echo.
pause