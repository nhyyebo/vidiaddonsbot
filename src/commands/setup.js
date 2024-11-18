const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://torrentio.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://torrentio.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Quick setup for Torrentio addon'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Torrentio Quick Setup')
            .setDescription('Install Torrentio with pre-configured settings for optimal performance.')
            .addFields(
                { name: 'Features', value: '• Multiple providers support\n• Quality filters\n• Debrid integration\n• Optimized settings' },
                { name: 'Installation', value: 'Click Install to add Torrentio to your Vidi player, or Configure to customize settings.' }
            )
            .setFooter({ text: 'Vidi Addons' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('setup_install')
                    .setLabel('Install Torrentio')
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
        if (interaction.customId === 'setup_install') {
            await interaction.editReply({
                content: `To install Torrentio, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
