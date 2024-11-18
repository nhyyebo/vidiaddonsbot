const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://cinemeta.elfhosted.com/manifest.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cinemeta')
        .setDescription('Install Cinemeta metadata addon'),
    
    async execute(interaction) {
        try {
            logger.info(`User ${interaction.user.tag} requested Cinemeta information`);

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Cinemeta Addon')
                .setThumbnail('attachment://cinemeta-modified.png')
                .setDescription('Cinemeta provides comprehensive metadata for movies and TV shows.')
                .addFields(
                    { name: 'Features', value: 
                        '• Movie and TV show metadata\n' +
                        '• High-quality posters\n' +
                        '• Cast and crew information\n' +
                        '• Episode details'
                    },
                    { name: 'Installation', value: 'Click Install to add the Cinemeta addon to your Vidi player. No configuration required!' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('cinemeta_install')
                        .setLabel('Install Cinemeta')
                        .setStyle(ButtonStyle.Primary)
                );

            const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'cinemeta-modified.png');

            await interaction.editReply({
                embeds: [embed],
                components: [row],
                files: [iconPath]
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
