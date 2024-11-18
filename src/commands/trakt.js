const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://trakt.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://trakt.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trakt')
        .setDescription('Install and configure Trakt addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Trakt Addon')
            .setThumbnail('attachment://trakt-modified.png')
            .setDescription('Track your watched movies and TV shows with Trakt integration.')
            .addFields(
                { name: 'Features', value: 
                    '• Sync watched history\n' +
                    '• Track your progress\n' +
                    '• Access your watchlist\n' +
                    '• Discover new content'
                },
                { name: 'Installation', value: 'Click Configure to set up your Trakt account, then Install to add the addon to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('trakt_install')
                    .setLabel('Install Trakt')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL('https://trakt.tv/auth/join')
                    .setLabel('Get Trakt Account')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'trakt-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'trakt_install') {
            await interaction.editReply({
                content: `To install Trakt, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
