const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://1fe84bc728af-imdb-catalogs.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://imdb.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imdb')
        .setDescription('Install IMDb Catalogs addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('IMDb Catalogs')
            .setDescription('A catalog addon that provides access to IMDb\'s vast library of movie and TV show information.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to IMDb\'s vast library\n' +
                    '• Detailed information about titles\n' +
                    '• Cast and crew details\n' +
                    '• Easy to use interface'
                },
                { name: 'Installation', value: 'Click Install to add this addon to your Vidi player. No configuration required.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('imdb_install')
                    .setLabel('Install IMDb Catalogs')
                    .setStyle(ButtonStyle.Primary)
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
