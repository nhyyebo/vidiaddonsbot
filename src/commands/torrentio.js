const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'vidi://torrentio.strem.fun/manifest.json';
const CONFIGURE_URL = 'https://torrentio.strem.fun/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('torrentio')
        .setDescription('Install and configure Torrentio addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Torrentio')
            .setDescription('A debrid link addon that provides access to a wide range of torrent files.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to a large library of torrent files\n' +
                    '• Support for multiple debrid services\n' +
                    '• Easy to use interface'
                },
                { name: 'Installation', value: 'Click Configure to set up this addon with your debrid service.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install Torrentio')
                    .setStyle(ButtonStyle.Link),
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
        if (interaction.customId === 'torrentio_install') {
            await interaction.editReply({
                content: `To install Torrentio, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
