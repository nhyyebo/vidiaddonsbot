const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'vidi://letterboxd.almosteffective.com/manifest.json';
const CONFIGURE_URL = 'https://letterboxd.almosteffective.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('letterboxd')
        .setDescription('Install and configure Letterboxd addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Letterboxd')
            .setDescription('A catalog addon that provides access to Letterboxd\'s vast library of movie information.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to Letterboxd\'s vast library\n' +
                    '• Detailed movie information\n' +
                    '• Cast and crew details\n' +
                    '• Ratings and reviews'
                },
                { name: 'Installation', value: 'Click Configure to set up this addon with your Letterboxd account.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install Letterboxd')
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
        if (interaction.customId === 'letterboxd_install') {
            await interaction.editReply({
                content: `To install Letterboxd, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
