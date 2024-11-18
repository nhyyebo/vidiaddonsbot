const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://imdb.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://imdb.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imdb')
        .setDescription('Install and configure IMDb addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('IMDb Addon')
            .setThumbnail('attachment://imdb-modified.png')
            .setDescription('Access IMDb\'s extensive movie and TV show database directly in Vidi.')
            .addFields(
                { name: 'Features', value: 
                    '• Comprehensive movie database\n' +
                    '• TV show information\n' +
                    '• Cast and crew details\n' +
                    '• User ratings and reviews'
                },
                { name: 'Installation', value: 'Click Configure to set up your IMDb account, then Install to add the addon to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('imdb_install')
                    .setLabel('Install IMDb')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL('https://www.imdb.com/signup')
                    .setLabel('Get IMDb Account')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'imdb-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'imdb_install') {
            await interaction.editReply({
                content: `To install IMDb, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
