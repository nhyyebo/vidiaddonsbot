const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'https://vidibot.netlify.app/imdb';

const CONFIGURE_URL = 'https://1fe84bc728af-imdb-catalogs.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imdb')
        .setDescription('Install and configure IMDb addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('IMDb')
            .setDescription('Access IMDb\'s extensive movie and TV show catalog.')
            .addFields(
                { name: 'Features', value: 
                    '• Extensive movie and TV catalog\n' +
                    '• IMDb ratings and reviews\n' +
                    '• Regular updates\n' +
                    '• Easy configuration'
                }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install IMDb')
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
