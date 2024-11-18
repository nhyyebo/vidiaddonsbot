const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Basic health check endpoint
app.get('/', (req, res) => {
    res.send('Bot is running!');
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}

// Function to send command usage notification to owner
async function notifyOwner(interaction, status = 'success', error = null) {
    try {
        const ownerId = process.env.OWNER_ID;
        if (!ownerId) {
            console.error('Owner ID not configured in environment variables');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor(status === 'success' ? '#00ff00' : '#ff0000')
            .setTitle(`Command ${status === 'success' ? 'Used' : 'Error'}`)
            .addFields(
                { name: 'Command', value: `/${interaction.commandName}` },
                { name: 'User', value: `${interaction.user.tag} (${interaction.user.id})` },
                { name: 'Server', value: interaction.guild.name },
                { name: 'Channel', value: interaction.channel.name }
            )
            .setTimestamp();

        // Add command options if any
        const options = [];
        interaction.options.data.forEach(option => {
            options.push(`${option.name}: ${option.value}`);
        });
        if (options.length > 0) {
            embed.addFields({ name: 'Options', value: options.join('\n') });
        }

        // Add error information if present
        if (error) {
            embed.addFields({ name: 'Error', value: `\`\`\`${error.message}\`\`\`` });
        }

        const owner = await client.users.fetch(ownerId);
        await owner.send({ embeds: [embed] });
    } catch (e) {
        console.error('Failed to send command usage notification:', e);
    }
}

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        // Send notification before executing command
        await notifyOwner(interaction, 'success');
        
        // Execute the command
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing command ${interaction.commandName}:`, error);
        
        // Send error notification
        await notifyOwner(interaction, 'error', error);
        
        // Only try to reply if the interaction hasn't been replied to yet
        if (!interaction.replied && !interaction.deferred) {
            try {
                await interaction.reply({
                    content: 'An error occurred while executing this command.',
                    ephemeral: true
                });
            } catch (err) {
                console.error('Error sending error message:', err);
            }
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
