const winston = require('winston');
const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

const OWNER_ID = process.env.OWNER_ID;

async function notifyOwner(client, user, action, details = {}) {
    try {
        const owner = await client.users.fetch(OWNER_ID);
        if (!owner) {
            console.error('Could not find owner with ID:', OWNER_ID);
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Bot Usage Notification')
            .addFields(
                { name: 'User', value: `${user.tag} (${user.id})` },
                { name: 'Action', value: action },
                { name: 'Time', value: new Date().toLocaleString() }
            )
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp();

        // Add any additional details
        if (details.commandName) {
            embed.addFields({ name: 'Command', value: details.commandName });
        }
        if (details.error) {
            embed.addFields({ name: 'Error', value: details.error.toString() });
            embed.setColor('#ff0000'); // Red color for errors
        }
        if (details.additionalInfo) {
            embed.addFields({ name: 'Additional Info', value: details.additionalInfo });
        }

        await owner.send({ embeds: [embed] });
    } catch (error) {
        console.error('Error sending notification to owner:', error);
    }
}

async function logError(client, error, context = {}) {
    console.error('Error occurred:', error);
    console.error('Context:', context);

    // Notify owner about the error
    if (context.user) {
        await notifyOwner(client, context.user, 'Error Occurred', {
            error,
            commandName: context.commandName,
            additionalInfo: context.additionalInfo
        });
    }
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = {
    logger,
    notifyOwner,
    logError
};
