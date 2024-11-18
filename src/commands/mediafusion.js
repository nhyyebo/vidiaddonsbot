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
            .setTitle('MediaFusion')
            .setDescription('A powerful addon that aggregates content from multiple sources.')
            .addFields(
                { name: 'Features', value: 
                    '• Multiple content sources\n' +
                    '• High-quality streams\n' +
                    '• Regular updates\n' +
                    '• Easy configuration'
                },
                { name: 'Installation', value: 'Click Configure to set up this addon with your preferences.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install MediaFusion')
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
        if (interaction.customId === 'mediafusion_install') {
            await interaction.editReply({
                content: `To install MediaFusion, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
