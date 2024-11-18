const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { handleCommand } = require('./utils/errorHandler');
const { logError } = require('./utils/logger');
require('dotenv').config();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ]
});

// Create collections for commands and buttons
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Load all command files
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}

// Function to send DM to owner
async function notifyOwner(message) {
    try {
        const owner = await client.users.fetch(process.env.OWNER_ID);
        await owner.send(message);
    } catch (error) {
        console.error('Failed to send DM to owner:', error);
    }
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Bot is ready!');
    
    // Set the bot's activity
    client.user.setPresence({
        activities: [{ name: 'Vidi', type: ActivityType.Watching }],
        status: 'online',
    });

    // Notify owner that bot is online
    notifyOwner(' Bot is now online and ready!');
});

// Handle interactions
client.on('interactionCreate', async interaction => {
    try {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            // Log command usage to owner
            notifyOwner(` Command Used: /${interaction.commandName}\nUser: ${interaction.user.tag}\nServer: ${interaction.guild.name}`);

            try {
                await interaction.deferReply({ ephemeral: true });
                await command.execute(interaction);
            } catch (error) {
                console.error('Error executing command:', error);
                logError(error.message, interaction.commandName, interaction.user, 'Error executing command');
                
                // Notify owner of error
                notifyOwner(` Error in command /${interaction.commandName}\nUser: ${interaction.user.tag}\nError: ${error.message}`);
                
                const errorMessage = ' There was an error executing this command.';
                if (interaction.deferred) {
                    await interaction.editReply({ content: errorMessage, ephemeral: true });
                } else if (!interaction.replied) {
                    await interaction.reply({ content: errorMessage, ephemeral: true });
                }
            }
        } else if (interaction.isButton()) {
            const [commandName] = interaction.customId.split('_');
            const command = client.commands.get(commandName);
            
            if (command && command.handleButton) {
                try {
                    await interaction.deferUpdate();
                    await command.handleButton(interaction);
                } catch (error) {
                    console.error('Error handling button:', error);
                    logError(error.message, interaction.customId, interaction.user, 'Error handling button');
                    
                    // Notify owner of button error
                    notifyOwner(` Error in button ${interaction.customId}\nUser: ${interaction.user.tag}\nError: ${error.message}`);
                    
                    if (!interaction.replied) {
                        await interaction.reply({
                            content: ' There was an error handling this button.',
                            ephemeral: true
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error in main interaction handler:', error);
        logError(error.message, interaction, interaction.user, 'Error in main interaction handler');
        
        // Notify owner of critical error
        notifyOwner(` Critical Error\nType: Main Interaction Handler\nError: ${error.message}`);
    }
});

// Handle process errors and notify owner
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
    notifyOwner(` Unhandled Promise Rejection:\n${error.message}`);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
    notifyOwner(` Uncaught Exception:\n${error.message}`);
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);

// Create an HTTP server to keep the bot alive
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
