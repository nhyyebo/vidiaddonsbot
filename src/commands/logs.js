const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { handleCommand } = require('../utils/errorHandler');
const { hasRequiredRole } = require('../utils/permissions');

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
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of logs to view')
                .setRequired(true)
                .addChoices(
                    { name: 'Commands', value: 'commands' },
                    { name: 'Errors', value: 'errors' },
                    { name: 'All', value: 'all' }
                )),

    async execute(interaction) {
        try {
            // Check for required role
            if (!await hasRequiredRole(interaction)) {
                await interaction.reply({
                    content: 'You do not have permission to use this command.',
                    ephemeral: true
                });
                return;
            }

            const logType = interaction.options.getString('type');
            let logs = [];

            switch (logType) {
                case 'commands':
                    logs = formatLogEntries(commandLogs, 'usage').split('\n');
                    break;
                case 'errors':
                    logs = formatLogEntries(errorLogs, 'error').split('\n\n');
                    break;
                case 'all':
                    logs = [...formatLogEntries(commandLogs, 'usage').split('\n'), ...formatLogEntries(errorLogs, 'error').split('\n\n')];
                    break;
                default:
                    logs = ['Invalid log type specified'];
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Bot Logs - ${logType.charAt(0).toUpperCase() + logType.slice(1)}`)
                .setDescription('```\n' + logs.join('\n') + '\n```')
                .setFooter({ text: 'Vidi Bot Logs' })
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in logs command:', error);
            await interaction.reply({ 
                content: 'An error occurred while fetching logs. Please try again later.',
                ephemeral: true 
            });
        }
    },

    // Export logging functions
    logCommand,
    logError
};
