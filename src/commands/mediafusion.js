const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://mediafusion.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://mediafusion.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mediafusion')
        .setDescription('Install and configure MediaFusion addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('MediaFusion Addon')
            .setThumbnail('attachment://mediafusion-modified.png')
            .setDescription('MediaFusion combines multiple sources to provide a comprehensive streaming experience.')
            .addFields(
                { name: 'Features', value: 
                    '• Multiple content sources\n' +
                    '• Smart source selection\n' +
                    '• High-quality streams\n' +
                    '• Automatic fallback'
                },
                { name: 'Installation', value: 'Click Configure to set up your preferences, then Install to add the addon to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('mediafusion_install')
                    .setLabel('Install MediaFusion')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'mediafusion-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'mediafusion_install') {
            await interaction.editReply({
                content: `To install MediaFusion, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
