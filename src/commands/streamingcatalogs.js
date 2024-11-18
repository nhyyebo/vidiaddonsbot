const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://7a82163c306e-stremio-netflix-catalog-addon.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://7a82163c306e-stremio-netflix-catalog-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('streamingcatalogs')
        .setDescription('Install and configure Streaming Catalogs addon'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Streaming Catalogs Addon')
            .setDescription('A catalog addon that provides access to a wide range of streaming services.')
            .addFields(
                { name: 'Features', value: '• Access to multiple streaming services\n• Detailed title information\n• Ratings and recommendations\n• Easy to use interface' },
                { name: 'Installation', value: 'Click Configure to set up your streaming services, then Install to add the addon to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('streamingcatalogs_install')
                    .setLabel('Install Streaming Catalogs')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'streamingcatalogs_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Streaming Catalogs')
                .setDescription(`Click [here](${MANIFEST_URL}) to install Streaming Catalogs.\n\nMake sure you have:\n1. Vidi installed on your device\n2. Configured your streaming services`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
