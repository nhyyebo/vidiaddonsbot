const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://jackett.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://jackett.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jackett')
        .setDescription('Install and configure Jackett addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Jackett Addon')
            .setThumbnail('attachment://jackett-modified.png')
            .setDescription('Access multiple content sources through Jackett\'s powerful indexing system.')
            .addFields(
                { name: 'Features', value: 
                    '• Multiple content sources\n' +
                    '• Advanced search options\n' +
                    '• Customizable indexers\n' +
                    '• Regular updates'
                },
                { name: 'Installation', value: 'Click Configure to set up your Jackett URL and API key, then Install to add the addon to your Vidi player.' }
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
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL('https://github.com/Jackett/Jackett#installation')
                    .setLabel('Get Jackett')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'jackett-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
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
