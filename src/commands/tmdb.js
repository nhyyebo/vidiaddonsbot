const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'vidi://94c8cb9f702d-tmdb-addon.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://94c8cb9f702d-tmdb-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tmdb')
        .setDescription('Install and configure TMDB addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('The Movie Database Addon')
            .setDescription('A metadata addon that provides access to The Movie Database\'s vast library of movie and TV show information.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to The Movie Database\'s vast library\n' +
                    '• Detailed information about titles\n' +
                    '• Cast and crew information\n' +
                    '• Ratings and reviews'
                },
                { name: 'Installation', value: 'Click Configure to set up this addon with your API key.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('tmdb_install')
                    .setLabel('Install TMDB')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.editReply({
            embeds: [embed],
            components: [row]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'tmdb_install') {
            await interaction.editReply({
                content: `To install TMDB, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
