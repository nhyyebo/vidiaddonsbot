const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/tmdb';
const CONFIGURE_URL = 'https://94c8cb9f702d-tmdb-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tmdb')
        .setDescription('Install and configure TMDB addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('The Movie Database Addon')
            .setDescription('A metadata addon that provides access to The Movie Database\'s vast library of movie and TV show information.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to The Movie Database\'s vast library of movie and TV show information\n' +
                    '• Detailed information about titles, including cast, crew, and ratings\n' +
                    '• Easy to use interface'
                }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install TMDB')
                    .setStyle(ButtonStyle.Link),
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
    }
};
