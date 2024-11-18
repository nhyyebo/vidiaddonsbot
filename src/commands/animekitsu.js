const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://animekitsu.strem.fun/manifest.json';
const CONFIGURE_URL = 'https://animekitsu.strem.fun/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('animekitsu')
        .setDescription('Install and configure AnimeKitsu addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('AnimeKitsu')
            .setDescription('A powerful anime addon that provides access to Kitsu\'s vast library.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to Kitsu\'s anime library\n' +
                    '• High-quality content\n' +
                    '• Regular updates\n' +
                    '• Easy configuration'
                },
                { name: 'Installation', value: 'Click Install to add AnimeKitsu to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install AnimeKitsu')
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
        if (interaction.customId === 'kitsu_install') {
            await interaction.editReply({
                content: `To install Kitsu, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
