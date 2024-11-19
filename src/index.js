const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { handleCommand } = require('./utils/commandHandler');
require('dotenv').config();

// Initialize Express app for Render
const app = express();
const PORT = process.env.PORT || 3000;

// Basic health check endpoint
app.get('/', (req, res) => {
    res.send('Bot is running!');
});

// Start Express server
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

// Ready event
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Handle interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    await handleCommand(command, interaction);
});

// Global error handlers
client.on('error', error => {
    console.error('Discord client error:', error);
});

client.on('warn', warning => {
    console.warn('Discord client warning:', warning);
});

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
