const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const logger = require('../utils/logger');

const MANIFEST_URL = 'https://v3-cinemeta.strem.io/manifest.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cinemeta')
        .setDescription('Get information about the Cinemeta addon'),
    
    async execute(interaction) {
        try {
            logger.info(`User ${interaction.user.tag} requested Cinemeta information`);

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Cinemeta Addon')
                .setThumbnail('attachment://cine.jpeg')
                .setDescription('Cinemeta is a metadata addon that provides comprehensive movie and TV show information.')
                .addFields(
                    { name: '📝 Features', value: '• Detailed movie and TV show metadata\n• Cast and crew information\n• High-quality posters and artwork\n• Regular database updates' },
                    { name: '⚙️ Installation', value: 'Click Install to add the Cinemeta addon to your Vidi player.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('cinemeta_install')
                        .setLabel('Install')
                        .setStyle(ButtonStyle.Primary)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/cine.jpeg'],
                ephemeral: true
            });
        } catch (error) {
            logger.error('Error in Cinemeta command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    },

    async handleButton(interaction) {
        try {
            if (interaction.customId === 'cinemeta_install') {
                logger.info(`User ${interaction.user.tag} clicked Cinemeta install button`);
                await interaction.reply({
                    content: `Click here to install: ${MANIFEST_URL}`,
                    ephemeral: true
                });
            }
        } catch (error) {
            logger.error('Error in Cinemeta button handler:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
