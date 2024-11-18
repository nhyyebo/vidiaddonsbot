const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://opensubtitles.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://opensubtitles.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opensubtitles')
        .setDescription('Install and configure OpenSubtitles addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('OpenSubtitles Addon')
            .setThumbnail('attachment://opensubtitles-modified.png')
            .setDescription('Access millions of subtitles from OpenSubtitles.org directly in Vidi.')
            .addFields(
                { name: 'Features', value: 
                    '• Millions of subtitles\n' +
                    '• Multiple languages\n' +
                    '• Auto-download support\n' +
                    '• Regular updates'
                },
                { name: 'Installation', value: 'Click Configure to set up your OpenSubtitles account, then Install to add the addon to your Vidi player.' }
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
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL('https://www.opensubtitles.org/en/newuser')
                    .setLabel('Get OpenSubtitles Account')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'opensubtitles-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
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
