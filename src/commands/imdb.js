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
            .setTitle('IMDb Catalogs')
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

        await interaction.editReply({
            embeds: [embed],
            components: [row]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'imdb_install') {
            await interaction.editReply({
                content: `To install IMDb Catalogs, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
