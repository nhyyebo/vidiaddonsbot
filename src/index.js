const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
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

// Create collections for commands
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

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Bot is ready!');
    client.user.setPresence({
        activities: [{ name: 'Vidi', type: ActivityType.Watching }],
        status: 'online',
    });
});

// Handle interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Error executing command:', error);
        logError(error.message, interaction.commandName, interaction.user, 'Error executing command');
        
        const errorMessage = '❌ There was an error executing this command.';
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: errorMessage, ephemeral: true });
            } else {
                await interaction.reply({ content: errorMessage, ephemeral: true });
            }
        } catch (err) {
            console.error('Error sending error message:', err);
        }
    }
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
