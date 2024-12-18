const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { handleCommand } = require('./utils/commandHandler');
const { deployCommands } = require('./utils/deployCommands');
require('dotenv').config();

// Initialize Express app for Render
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}

function setMobilePresence() {
    client.user.setPresence({
        activities: [{ name: '/dmhelp', type: ActivityType.Playing }],
        status: 'online'
    });
}

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await deployCommands();
    setMobilePresence();
});

// Handle interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await handleCommand(command, interaction);
    } catch (error) {
        console.error('Error:', error);
    }
});

// Moved the interactionCreate listener here
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'markDone') {
        try {
            const channelId = process.env.DONE_CHANNEL_ID; 
            const channel = await interaction.client.channels.fetch(channelId);
            const userId = interaction.message.embeds[0].fields[0].value.match(/\d+/)[0];
            await channel.send(`The suggestion from <@${userId}> has been marked as done!`);
            await interaction.reply({ content: 'Marked as done and user notified in the channel.', ephemeral: true });
        } catch (error) {
            console.error('Error handling button interaction:', error);
            if (!interaction.replied) {
                await interaction.reply({
                    content: 'An error occurred while processing your request. Please try again later.',
                    ephemeral: true
                });
            }
        }
    }
});

// Error handlers
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught exception:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Received SIGINT. Performing graceful shutdown...');
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Performing graceful shutdown...');
    client.destroy();
    process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);
