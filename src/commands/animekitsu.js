const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://anime-kitsu.strem.fun/manifest.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('animekitsu')
        .setDescription('Get information about the AnimeKitsu addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#FF9999')
                .setTitle('AnimeKitsu Addon')
                .setThumbnail('attachment://anime-modified.png')
                .setDescription('AnimeKitsu provides comprehensive anime metadata and information.')
                .addFields(
                    { name: '📝 Features', value: '• Detailed anime information\n• Season and episode data\n• Japanese and English titles\n• Anime artwork and posters' },
                    { name: '⚙️ Installation', value: 'Click Install to add the AnimeKitsu addon to your Vidi player.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('animekitsu_install')
                        .setLabel('Install Anime Kitsu')
                        .setStyle(ButtonStyle.Primary)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/anime-modified.png'],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in animekitsu command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'animekitsu_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Anime Kitsu')
                .setDescription(`Click [here](${MANIFEST_URL}) to install Anime Kitsu.\n\nMake sure you have Vidi installed on your device.`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
