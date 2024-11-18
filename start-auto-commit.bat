@echo off
echo Starting auto-commit script...

:: Check if git is configured
git config --get user.name >nul 2>&1
if errorlevel 1 (
    echo Git user.name not configured. Please run:
    echo git config --global user.name "Your Name"
    echo git config --global user.email "your.email@example.com"
    pause
    exit /b 1
)

:: Check if git is initialized
if not exist ".git" (
    echo Git repository not initialized. Initializing...
    git init
)

:: Start the auto-commit script
node auto-commit.js

pause
