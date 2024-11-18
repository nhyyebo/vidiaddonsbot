const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://tmdb.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://tmdb.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tmdb')
        .setDescription('Install and configure TMDB addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('TMDB Addon')
            .setThumbnail('attachment://tmdb-modified.png')
            .setDescription('The Movie Database (TMDB) addon provides rich metadata and information for movies and TV shows.')
            .addFields(
                { name: 'Features', value: 
                    '• Detailed movie and TV show information\n' +
                    '• High-quality posters and artwork\n' +
                    '• Cast and crew details\n' +
                    '• Ratings and reviews'
                },
                { name: 'Installation', value: 'Click Configure to set up your TMDB API key, then Install to add the addon to your Vidi player.' }
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
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL('https://www.themoviedb.org/signup')
                    .setLabel('Get TMDB Account')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'tmdb-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
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
