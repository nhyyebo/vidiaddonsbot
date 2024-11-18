const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/jackett';
const CONFIGURE_URL = 'https://jackettio.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jackett')
        .setDescription('Install and configure Jackett addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Jackett')
            .setDescription('Access content from various torrent trackers.')
            .addFields(
                { name: 'Features', value: 
                    '• Multiple torrent trackers\n' +
                    '• Real-time search\n' +
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
                    .setLabel('Install Jackett')
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
