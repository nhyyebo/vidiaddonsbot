const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/jackett';
const CONFIGURE_URL = 'https://b89262c192b0-stremio-jackett-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jackett')
        .setDescription('Install and configure Jackett addon'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Jackett')
                .setDescription('Access content from multiple torrent trackers.')
                .addFields(
                    { name: 'Installation', value: 'Click the Install button below to add Jackett.' },
                    { name: 'Configuration', value: 'After installation, use the Configure button to set up your trackers.' }
                )
                .setFooter({ text: 'Jackett Addon' })
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
            console.error('Error in Jackett command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
