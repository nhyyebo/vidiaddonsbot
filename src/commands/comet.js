const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://comet.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://comet.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comet')
        .setDescription('Install and configure Comet addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Comet Addon')
            .setThumbnail('attachment://comet-modified.png')
            .setDescription('Comet is a powerful metadata addon that enhances your media library with rich information.')
            .addFields(
                { name: 'Features', value: 
                    '• Enhanced metadata\n' +
                    '• Automatic media recognition\n' +
                    '• Rich media information\n' +
                    '• Fast and efficient'
                },
                { name: 'Installation', value: 'Click Install to add the Comet addon to your Vidi player. No configuration required!' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('comet_install')
                    .setLabel('Install Comet')
                    .setStyle(ButtonStyle.Primary)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'comet-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'comet_install') {
            await interaction.editReply({
                content: `To install Comet, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
