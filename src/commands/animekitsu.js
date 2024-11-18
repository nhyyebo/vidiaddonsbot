const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://animekitsu.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://animekitsu.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('animekitsu')
        .setDescription('Install and configure Kitsu anime addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Kitsu Anime Addon')
            .setThumbnail('attachment://kitsu-modified.png')
            .setDescription('Access rich anime metadata and information from Kitsu directly in Vidi.')
            .addFields(
                { name: 'Features', value: 
                    '• Detailed anime information\n' +
                    '• High-quality artwork\n' +
                    '• Episode details\n' +
                    '• Ratings and reviews'
                },
                { name: 'Installation', value: 'Click Configure to set up your Kitsu account, then Install to add the addon to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('animekitsu_install')
                    .setLabel('Install Kitsu')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL('https://kitsu.io/explore/anime')
                    .setLabel('Get Kitsu Account')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'kitsu-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'animekitsu_install') {
            await interaction.editReply({
                content: `To install Kitsu, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
