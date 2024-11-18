const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://94c8cb9f702d-tmdb-addon.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://94c8cb9f702d-tmdb-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tmdb')
        .setDescription('Install and configure The Movie Database addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#01B4E4') // TMDB's brand color
                .setTitle('The Movie Database Addon')
                .setThumbnail('attachment://tmdb.jpeg')
                .setDescription('A metadata addon that provides access to The Movie Database\'s vast library of movie and TV show information.')
                .addFields(
                    { name: '📝 Features', value: '• Access to TMDB\'s vast library\n• Detailed title information\n• Cast and crew details\n• Ratings and reviews\n• Easy to use interface' },
                    { name: '🔑 API Key', value: 'A TMDB API key is required. [Get one here](https://www.themoviedb.org/settings/api)' },
                    { name: '⚙️ Installation', value: 'Click Configure to set up your TMDB API key, then Install to add the addon to your Vidi player.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('tmdb_install')
                        .setLabel('Install TMDB')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setURL('https://www.themoviedb.org/signup')
                        .setLabel('Get API Key')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: [
                    './addonicons/tmdb.jpeg'
                ],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in tmdb command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'tmdb_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install TMDB')
                .setDescription(`Click [here](${MANIFEST_URL}) to install The Movie Database addon.\n\nMake sure you have:\n1. Vidi installed on your device\n2. A TMDB account\n3. Configured your API key`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
