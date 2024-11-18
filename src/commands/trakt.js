const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/trakt';
const CONFIGURE_URL = 'https://2ecbbd610840-trakt.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trakt')
        .setDescription('Install and configure Trakt addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Trakt.tv')
            .setDescription('Access your Trakt watchlist and collection.')
            .addFields(
                { name: 'Features', value: 
                    '• Sync with Trakt watchlist\n' +
                    '• Access your collection\n' +
                    '• Track watched status\n' +
                    '• Easy configuration'
                }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install Trakt')
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
