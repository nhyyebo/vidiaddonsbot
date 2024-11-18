const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('discord.js');

const MANIFEST_URL = 'vidi://jackett.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://jackett.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jackett')
        .setDescription('Install and configure Jackett addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Jackett')
            .setDescription('A powerful addon that integrates with Jackett to provide access to multiple torrent sources.')
            .addFields(
                { name: 'Features', value: 
                    '• Multiple torrent sources\n' +
                    '• High-quality content\n' +
                    '• Regular updates\n' +
                    '• Easy configuration'
                },
                { name: 'Installation', value: 'Click Configure to set up this addon with your Jackett instance.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('jackett_install')
                    .setLabel('Install Jackett')
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
        if (interaction.customId === 'jackett_install') {
            await interaction.editReply({
                content: `To install Jackett, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
