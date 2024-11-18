const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import functions
const { logCommand } = require('./commands/logs');
const { handleCommand, handleButton, handleModal } = require('./utils/errorHandler');
const { deployCommands } = require('./utils/deployCommands');
const { notifyOwner, logError, logger } = require('./utils/logger');

// Create Discord client with all necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Initialize commands collection
client.commands = new Collection();

// Load command files
try {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        // Validate command structure
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`[WARNING] The command at ${filePath} is missing required "data" or "execute" property.`);
        }
    }
} catch (error) {
    console.error('Error loading commands:', error);
}

// Bot ready event
client.once('ready', async () => {
    console.log(`Bot is ready! Logged in as ${client.user.tag}`);
    console.log(`Loaded ${client.commands.size} commands`);

    // Deploy commands
    console.log('Starting command deployment...');
    const deployed = await deployCommands();
    if (deployed) {
        console.log('Commands deployed successfully!');
    } else {
        console.error('Failed to deploy commands.');
    }

    // Set activity to "Watching Vidi"
    client.user.setPresence({
        activities: [{
            name: 'Vidi',
            type: ActivityType.Watching
        }],
        status: 'online'
    });
});

// Handle errors
client.on('error', async error => {
    logger.error('Discord client error:', error);
    await logError(client, error, { additionalInfo: 'Discord client error' });
});

client.on('shardError', async error => {
    logger.error('WebSocket connection error:', error);
    await logError(client, error, { additionalInfo: 'WebSocket connection error' });
});

process.on('unhandledRejection', async error => {
    logger.error('Unhandled promise rejection:', error);
    await logError(client, error, { additionalInfo: 'Unhandled promise rejection' });
});

// Interaction handling
client.on('interactionCreate', async interaction => {
    try {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            // Log command usage and notify owner
            if (interaction.commandName !== 'logs') {
                logCommand(interaction.user, interaction.commandName, Date.now());
                await notifyOwner(client, interaction.user, 'Command Used', {
                    commandName: interaction.commandName,
                    additionalInfo: `Channel: ${interaction.channel.name}`
                });
            }

            // Execute command with error handling
            await handleCommand(interaction, async () => {
                try {
                    await command.execute(interaction);
                } catch (error) {
                    await logError(client, error, {
                        user: interaction.user,
                        commandName: interaction.commandName,
                        additionalInfo: 'Error executing command'
                    });
                    throw error; // Re-throw for handleCommand to handle the response
                }
            });

        } else if (interaction.isButton()) {
            const [commandName] = interaction.customId.split('_');
            const command = client.commands.get(commandName);
            
            if (command?.handleButton) {
                // Log button interaction and notify owner
                logCommand(interaction.user, `${commandName} (button)`, Date.now());
                await notifyOwner(client, interaction.user, 'Button Clicked', {
                    commandName: `${commandName} (button)`,
                    additionalInfo: `Button ID: ${interaction.customId}`
                });

                await handleButton(interaction, async () => {
                    try {
                        await command.handleButton(interaction);
                    } catch (error) {
                        await logError(client, error, {
                            user: interaction.user,
                            commandName: `${commandName} (button)`,
                            additionalInfo: 'Error handling button'
                        });
                        throw error;
                    }
                });
            }

        } else if (interaction.isModalSubmit()) {
            const [commandName] = interaction.customId.split('_');
            const command = client.commands.get(commandName);
            
            if (command?.handleModal) {
                // Log modal submission and notify owner
                logCommand(interaction.user, `${commandName} (modal)`, Date.now());
                await notifyOwner(client, interaction.user, 'Modal Submitted', {
                    commandName: `${commandName} (modal)`,
                    additionalInfo: `Modal ID: ${interaction.customId}`
                });

                await handleModal(interaction, async () => {
                    try {
                        await command.handleModal(interaction);
                    } catch (error) {
                        await logError(client, error, {
                            user: interaction.user,
                            commandName: `${commandName} (modal)`,
                            additionalInfo: 'Error handling modal'
                        });
                        throw error;
                    }
                });
            }
        }
    } catch (error) {
        logger.error('Error in interaction handler:', error);
        await logError(client, error, {
            user: interaction.user,
            additionalInfo: 'Error in main interaction handler'
        });
    }
});

// Login with error handling
client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error('Failed to login:', error);
    process.exit(1);
});
