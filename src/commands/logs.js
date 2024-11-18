const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { handleCommand } = require('../utils/errorHandler');
const { hasRequiredRole } = require('../utils/permissions');
const fs = require('fs').promises;
const path = require('path');

// Store command usage and errors in memory with timestamps
const commandLogs = [];
const errorLogs = [];

// Function to add command usage log with validation
function logCommand(user, command, timestamp) {
    if (!user || !command || !timestamp) {
        console.error('Invalid log entry:', { user, command, timestamp });
        return;
    }
    
    try {
        commandLogs.push({ user, command, timestamp });
        // Keep only last 50 commands
        if (commandLogs.length > 50) commandLogs.shift();
    } catch (error) {
        console.error('Error logging command:', error);
    }
}

// Function to add error log with validation
function logError(error, command, user, timestamp) {
    if (!error || !command || !user || !timestamp) {
        console.error('Invalid error log entry:', { error, command, user, timestamp });
        return;
    }
    
    try {
        errorLogs.push({ error, command, user, timestamp });
        // Keep only last 50 errors
        if (errorLogs.length > 50) errorLogs.shift();
    } catch (error) {
        console.error('Error logging error:', error);
    }
}

// Format log entries for display
function formatLogEntries(logs, type) {
    try {
        return logs
            .slice(-10) // Get last 10 entries
            .reverse() // Show newest first
            .map(log => {
                const time = new Date(log.timestamp).toLocaleString();
                if (type === 'usage') {
                    return `\`${time}\` - ${log.user.tag} (${log.user.id}) used /${log.command}`;
                } else {
                    return `\`${time}\` - Error in /${log.command}\nUser: ${log.user.tag}\nError: ${log.error}`;
                }
            })
            .join(type === 'usage' ? '\n' : '\n\n') || `No ${type} logs available.`;
    } catch (error) {
        console.error('Error formatting log entries:', error);
        return 'Error formatting logs.';
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('View bot logs (Staff only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        if (!await hasRequiredRole(interaction)) {
            await interaction.editReply({
                content: '❌ You do not have permission to view logs.',
                ephemeral: true
            });
            return;
        }

        try {
            const logsDir = path.join(__dirname, '..', '..', 'logs');
            const files = await fs.readdir(logsDir);
            const logFiles = files.filter(file => file.endsWith('.log'));

            if (logFiles.length === 0) {
                await interaction.editReply({
                    content: '📝 No log files found.',
                    ephemeral: true
                });
                return;
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Bot Logs')
                .setDescription('Here are the most recent log files:')
                .addFields(
                    logFiles.map(file => ({
                        name: file,
                        value: `Created: ${new Date(fs.statSync(path.join(logsDir, file)).birthtime).toLocaleString()}`
                    }))
                )
                .setFooter({ text: 'Vidi Bot Logs' })
                .setTimestamp();

            await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in logs command:', error);
            await interaction.editReply({
                content: '❌ An error occurred while fetching logs.',
                ephemeral: true
            });
        }
    },

    // Export logging functions
    logCommand,
    logError
};
