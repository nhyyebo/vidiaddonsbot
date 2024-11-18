const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the current timestamp in a readable format
function getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}

// Execute git commands
function runGitCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${command}:`, error);
                reject(error);
                return;
            }
            resolve(stdout || stderr);
        });
    });
}

// Create or update the keepalive file
function updateKeepAliveFile() {
    const keepAlivePath = path.join(__dirname, 'keepalive.txt');
    const timestamp = getTimestamp();
    fs.writeFileSync(keepAlivePath, `Last auto-commit: ${timestamp}\n`);
}

// Main function to perform git operations
async function autoCommit() {
    try {
        // Create a change by updating the keepalive file
        updateKeepAliveFile();

        // Add all changes
        await runGitCommand('git add .');
        
        // Create commit with timestamp
        const timestamp = getTimestamp();
        await runGitCommand(`git commit -m "auto-commit: Keep alive - ${timestamp}"`);
        
        // Push changes
        await runGitCommand('git push');
        
        console.log(`Successfully committed and pushed at ${timestamp}`);
    } catch (error) {
        console.error('Failed to auto-commit:', error);
    }
}

// Run every 15 minutes
const INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds
setInterval(autoCommit, INTERVAL);

// Run once immediately on start
autoCommit();

console.log('Auto-commit script is running...');
