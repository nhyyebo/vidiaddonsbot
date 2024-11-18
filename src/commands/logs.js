const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { isAdminOrOwner, safeReply, validateInteraction } = require('../utils/errorHandler');
require('dotenv').config();

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
        .setDescription('View bot usage and error logs')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of logs to view')
                .setRequired(true)
                .addChoices(
                    { name: 'Command Usage', value: 'usage' },
                    { name: 'Errors', value: 'errors' }
                )),
    
    async execute(interaction) {
        try {
            // Validate interaction
            validateInteraction(interaction);

            // Check permissions
            if (!isAdminOrOwner(interaction)) {
                return await safeReply(
                    interaction,
                    'You do not have permission to use this command.',
                    { ephemeral: true }
                );
            }

            const logType = interaction.options.getString('type');
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTimestamp();

            if (logType === 'usage') {
                embed.setTitle('Command Usage Logs')
                    .setDescription('Recent command usage:')
                    .addFields({ 
                        name: 'Last 10 Commands',
                        value: formatLogEntries(commandLogs, 'usage')
                    });
            } else {
                embed.setTitle('Error Logs')
                    .setDescription('Recent errors:')
                    .addFields({ 
                        name: 'Last 10 Errors',
                        value: formatLogEntries(errorLogs, 'errors')
                    });
            }

            await safeReply(interaction, null, {
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in logs command:', error);
            await safeReply(
                interaction,
                'An error occurred while retrieving the logs.',
                { ephemeral: true }
            );
        }
    },

    // Export logging functions
    logCommand,
    logError
};
