const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://letterboxd.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://letterboxd.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('letterboxd')
        .setDescription('Install and configure Letterboxd addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Letterboxd Addon')
            .setThumbnail('attachment://letterboxd-modified.png')
            .setDescription('Access your Letterboxd watchlist, reviews, and ratings directly in Vidi.')
            .addFields(
                { name: 'Features', value: 
                    '• Import your watchlist\n' +
                    '• Sync your ratings\n' +
                    '• View your reviews\n' +
                    '• Discover new films'
                },
                { name: 'Installation', value: 'Click Configure to set up your Letterboxd username, then Install to add the addon to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('letterboxd_install')
                    .setLabel('Install Letterboxd')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL('https://letterboxd.com/signup')
                    .setLabel('Get Letterboxd Account')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'letterboxd-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'letterboxd_install') {
            await interaction.editReply({
                content: `To install Letterboxd, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
