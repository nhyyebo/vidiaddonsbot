const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/letterboxd';
const CONFIGURE_URL = 'https://addons.almosteffective.com/configure/letterboxd';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('letterboxd')
        .setDescription('Install and configure Letterboxd addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Letterboxd')
            .setDescription('Access your Letterboxd watchlist and reviews.')
            .addFields(
                { name: 'Features', value: 
                    '• Letterboxd integration\n' +
                    '• Watchlist sync\n' +
                    '• Reviews and ratings\n' +
                    '• Easy configuration'
                }
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

        await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    }
};
