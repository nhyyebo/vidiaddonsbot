const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://cyberflix.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://cyberflix.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cyberflix')
        .setDescription('Install and configure CyberFlix addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('CyberFlix Addon')
            .setThumbnail('attachment://cyberflix-modified.png')
            .setDescription('CyberFlix is a powerful streaming addon that provides access to a vast library of content.')
            .addFields(
                { name: 'Features', value: 
                    '• Large content library\n' +
                    '• Multiple quality options\n' +
                    '• Fast streaming\n' +
                    '• Regular updates'
                },
                { name: 'Installation', value: 'Click Configure to set up your account, then Install to add the addon to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('cyberflix_install')
                    .setLabel('Install CyberFlix')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'cyberflix-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'cyberflix_install') {
            await interaction.editReply({
                content: `To install CyberFlix, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
