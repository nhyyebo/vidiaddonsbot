const { EmbedBuilder } = require('discord.js');

// Handles rate limiting and cooldowns
const cooldowns = new Map();

async function handleCommand(command, interaction) {
    try {
        // Check rate limiting
        const now = Date.now();
        const cooldownAmount = 1000; // 1 second cooldown
        
        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Map());
        }

        const timestamps = cooldowns.get(command.data.name);
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return await interaction.reply({ 
                    content: `Please wait ${timeLeft.toFixed(1)} more seconds before using this command again.`,
                    ephemeral: true 
                });
            }
        }

        timestamps.set(interaction.user.id, now);

        // Execute command
        await command.execute(interaction);

    } catch (error) {
        console.error(`Error in command ${command.data.name}:`, error);
        
        try {
            const errorMessage = {
                content: 'There was an error while executing this command!',
                ephemeral: true
            };

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply(errorMessage);
            }
        } catch (err) {
            console.error('Error sending error message:', err);
        }
    }
}

async function handleInteraction(interaction) {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        await handleCommand(command, interaction);
    } else if (interaction.isButton()) {
        const command = client.commands.get('recommend');
        if (interaction.customId.startsWith('more_info_')) {
            await command.handleMoreInfo(interaction);
        }
    }
}

module.exports = { handleCommand, handleInteraction };
