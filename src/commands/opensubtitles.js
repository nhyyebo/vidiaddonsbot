const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://2ecbbd610840-opensubtitles.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://opensubtitlesv3-pro.dexter21767.com/configure/';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opensubtitles')
        .setDescription('Install and configure OpenSubtitles addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('OpenSubtitles')
            .setDescription('A subtitle addon that provides access to OpenSubtitles\' vast library of subtitles.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to OpenSubtitles\' vast library\n' +
                    '• Support for multiple languages\n' +
                    '• Easy to use interface'
                },
                { name: 'Installation', value: 'Click Configure to set up this addon with your OpenSubtitles account.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('opensubtitles_install')
                    .setLabel('Install OpenSubtitles')
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
        if (interaction.customId === 'opensubtitles_install') {
            await interaction.editReply({
                content: `To install OpenSubtitles, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
