const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://anime-kitsu.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://kitsu.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('animekitsu')
        .setDescription('Install and configure Kitsu addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Kitsu Anime Addon')
            .setDescription('Access a vast library of anime content through Kitsu.')
            .addFields(
                { name: 'Features', value: 
                    '• Extensive anime library\n' +
                    '• Detailed metadata\n' +
                    '• Regular updates\n' +
                    '• User ratings and reviews'
                },
                { name: 'Installation', value: 'Click Install to add Kitsu to your Vidi player, or Configure to customize settings.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('kitsu_install')
                    .setLabel('Install Kitsu')
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
        if (interaction.customId === 'kitsu_install') {
            await interaction.editReply({
                content: `To install Kitsu, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
