const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/torrentio';
const CONFIGURE_URL = 'https://b89262c192b0-stremio-torrentio-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('torrentio')
        .setDescription('Install and configure Torrentio addon'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Torrentio')
                .setDescription('Access content from multiple torrent sources.')
                .addFields(
                    { name: 'Installation', value: 'Click Install to add Torrentio.' },
                    { name: 'Configuration', value: 'After installation, use Configure to set up your preferences.' }
                )
                .setFooter({ text: 'Torrentio Addon' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(MANIFEST_URL)
                        .setLabel('🔗Install')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('⚙️Configure')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in Torrentio command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
