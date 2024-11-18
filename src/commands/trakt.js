const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'vidi://2ecbbd610840-trakt.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://2ecbbd610840-trakt.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trakt')
        .setDescription('Install and configure Trakt.tv addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Trakt.tv')
            .setDescription('A catalog addon that provides access to Trakt.tv\'s vast library of movie and TV show information.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to Trakt\'s vast library\n' +
                    '• Movie and TV show lists\n' +
                    '• Personal catalogs\n' +
                    '• Easy to use interface'
                },
                { name: 'Installation', value: 'Click Configure to set up this addon with your Trakt.tv account.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('trakt_install')
                    .setLabel('Install Trakt')
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
        if (interaction.customId === 'trakt_install') {
            await interaction.editReply({
                content: `To install Trakt, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
