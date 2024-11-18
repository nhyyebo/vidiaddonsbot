const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://v3-cinemeta.strem.io/manifest.json';

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
                .setDescription('The official addon for movie, series, and anime metadata. Provides comprehensive information about titles including cast, crew, ratings, and more.')
                .addFields(
                    { name: 'Features', value: 
                        '• Detailed movie and TV show information\n' +
                        '• Cast and crew details\n' +
                        '• IMDb ratings integration\n' +
                        '• Episode descriptions\n' +
                        '• Release dates and runtime information'
                    },
                    { name: 'Installation', value: 'Click Install to add this addon to your Vidi player. No configuration required.' }
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

            await interaction.editReply({
                embeds: [embed],
                components: [row]
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
                await interaction.editReply({
                    content: `To install Cinemeta, click this link:\n${MANIFEST_URL}`,
                    components: [],
                    embeds: []
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
