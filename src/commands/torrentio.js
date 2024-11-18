const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://torrentio.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://torrentio.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('torrentio')
        .setDescription('Install and configure Torrentio addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Torrentio Addon')
            .setThumbnail('attachment://torrentio-modified.png')
            .setDescription('Access a vast library of content through Torrentio\'s powerful indexing system.')
            .addFields(
                { name: 'Features', value: 
                    '• Large content library\n' +
                    '• Multiple quality options\n' +
                    '• Fast indexing\n' +
                    '• Regular updates'
                },
                { name: 'Installation', value: 'Click Configure to set up your preferences, then Install to add the addon to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('torrentio_install')
                    .setLabel('Install Torrentio')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'torrentio-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'torrentio_install') {
            await interaction.editReply({
                content: `To install Torrentio, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
