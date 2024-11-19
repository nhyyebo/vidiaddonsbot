const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/opensubtitles';
const CONFIGURE_URL = 'https://b89262c192b0-stremio-opensubtitles-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opensubtitles')
        .setDescription('Install and configure OpenSubtitles addon'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('OpenSubtitles')
                .setDescription('Access subtitles from OpenSubtitles database.')
                .addFields(
                    { name: 'Installation', value: 'Click Install to add OpenSubtitles.' },
                    { name: 'Configuration', value: 'After installation, use Configure to set up your account.' }
                )
                .setFooter({ text: 'OpenSubtitles Addon' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(MANIFEST_URL)
                        .setLabel('Install')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in OpenSubtitles command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
