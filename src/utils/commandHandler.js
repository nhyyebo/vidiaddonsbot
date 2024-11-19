const { EmbedBuilder } = require('discord.js');

// Handles rate limiting and cooldowns
const cooldowns = new Map();

// Error messages mapped to user-friendly responses
const errorMessages = {
    'Unknown interaction': 'The command took too long to process. Please try again.',
    'Missing Permissions': 'I don\'t have the required permissions to perform this action.',
    'Unknown Message': 'The message could not be found. It may have been deleted.',
    'Unknown Channel': 'The channel could not be found.',
    'Invalid Form Body': 'There was an issue with the command input.',
    'Missing Access': 'I don\'t have access to perform this action.',
    'Cannot send messages to this user': 'I cannot send DMs to this user.',
    default: 'An unexpected error occurred. Please try again later.'
};

// Get user-friendly error message
function getUserFriendlyError(error) {
    for (const [key, message] of Object.entries(errorMessages)) {
        if (error.message.includes(key)) {
            return message;
        }
    }
    return errorMessages.default;
}

// Check if user is rate limited
function isRateLimited(userId, commandName) {
    const now = Date.now();
    const cooldownAmount = 1000; // 1 second cooldown

    if (!cooldowns.has(commandName)) {
        cooldowns.set(commandName, new Map());
    }

    const timestamps = cooldowns.get(commandName);
    if (timestamps.has(userId)) {
        const expirationTime = timestamps.get(userId) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return timeLeft;
        }
    }

    timestamps.set(userId, now);
    
    // Clear old entries every minute to prevent memory leaks
    if (timestamps.size > 1000) {
        const oneMinuteAgo = now - 60000;
        timestamps.forEach((timestamp, key) => {
            if (timestamp < oneMinuteAgo) timestamps.delete(key);
        });
    }
    
    return false;
}

// Main command handler wrapper
async function handleCommand(command, interaction) {
    try {
        // Immediately defer the reply to prevent timeout
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply({ ephemeral: true });
        }

        // Check rate limiting
        const timeLeft = isRateLimited(interaction.user.id, command.data.name);
        if (timeLeft) {
            await interaction.editReply({
                content: `Please wait ${timeLeft.toFixed(1)} more seconds before using this command again.`,
                ephemeral: true
            });
            return;
        }

        // Check if bot has required permissions
        const requiredPermissions = command.requiredPermissions || [];
        if (interaction.guild) {
            const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
            const missingPermissions = requiredPermissions.filter(perm => !botMember.permissions.has(perm));
            
            if (missingPermissions.length > 0) {
                await interaction.editReply({
                    content: `I need the following permissions to execute this command: ${missingPermissions.join(', ')}`,
                    ephemeral: true
                });
                return;
            }
        }

        // Execute command with timeout protection
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Command timed out')), 10000); // 10 second timeout
        });

        await Promise.race([
            command.execute(interaction),
            timeoutPromise
        ]);

    } catch (error) {
        console.error(`Error in command ${command.data.name}:`, error);

        // Create error embed
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription(getUserFriendlyError(error))
            .setFooter({ text: 'If this error persists, please contact support.' })
            .setTimestamp();

        try {
            // Handle the error response
            if (interaction.deferred) {
                await interaction.editReply({ embeds: [errorEmbed] });
            } else if (!interaction.replied) {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            }

            // Log error to designated channel if configured
            const errorChannel = interaction.client.channels.cache.get(process.env.ERROR_LOG_CHANNEL);
            if (errorChannel) {
                const detailedErrorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle(`Command Error: ${command.data.name}`)
                    .setDescription(`\`\`\`${error.stack || error.message}\`\`\``)
                    .addFields(
                        { name: 'User', value: `${interaction.user.tag} (${interaction.user.id})` },
                        { name: 'Guild', value: interaction.guild ? `${interaction.guild.name} (${interaction.guild.id})` : 'DM' },
                        { name: 'Channel', value: `${interaction.channel.name} (${interaction.channel.id})` }
                    )
                    .setTimestamp();

                await errorChannel.send({ embeds: [detailedErrorEmbed] });
            }
        } catch (followUpError) {
            console.error('Error sending error message:', followUpError);
        }
    }
}

module.exports = { handleCommand };
