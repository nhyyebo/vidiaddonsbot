const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'https://vidibot.netlify.app/opensubtitles';
const CONFIGURE_URL = 'https://opensubtitlesv3-pro.dexter21767.com/configure/';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opensubtitles')
        .setDescription('Install and configure OpenSubtitles addon'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('OpenSubtitles')
                .setDescription('Access OpenSubtitles vast subtitle database.')
                .addFields(
                    { name: 'Features', value: 
                        '• Extensive subtitle database\n' +
                        '• Multiple languages\n' +
                        '• Regular updates\n' +
                        '• Easy configuration'
                    }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(MANIFEST_URL)
                        .setLabel('Install OpenSubtitles')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link)
                );

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    embeds: [embed],
                    components: [row],
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error('Error in OpenSubtitles command:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ 
                    content: 'An error occurred while processing your request. Please try again later.',
                    ephemeral: true 
                });
            }
        }
    }
};
