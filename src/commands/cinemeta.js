const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'https://vidibot.netlify.app/cinemeta';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cinemeta')
        .setDescription('Install Cinemeta addon'),

    async execute(interaction) {
        try {
            logger.info(`User ${interaction.user.tag} requested Cinemeta information`);

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Cinemeta')
                .setDescription('The official addon for movie, series, and anime metadata.')
                .addFields(
                    { name: 'Features', value: 
                        '• Detailed movie and TV show information\n' +
                        '• Cast and crew details\n' +
                        '• IMDb ratings integration\n' +
                        '• Episode descriptions\n' +
                        '• Release dates and runtime information'
                    }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(MANIFEST_URL)
                        .setLabel('Install Cinemeta')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            logger.error('Error in Cinemeta command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
