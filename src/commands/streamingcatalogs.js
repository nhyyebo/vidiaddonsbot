const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/streamingcatalogs';
const CONFIGURE_URL = 'https://b89262c192b0-stremio-streamingcatalogs-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('streamingcatalogs')
        .setDescription('Install and configure Streaming Catalogs addon'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Streaming Catalogs')
                .setDescription('Access content from various streaming platforms.')
                .addFields(
                    { name: 'Installation', value: 'Click Install to add Streaming Catalogs.' },
                    { name: 'Configuration', value: 'After installation, use Configure to set up your preferences.' }
                )
                .setFooter({ text: 'Streaming Catalogs Addon' })
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
            console.error('Error in Streaming Catalogs command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
