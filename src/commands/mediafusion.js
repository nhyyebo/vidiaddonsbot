const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/mediafusion';
const CONFIGURE_URL = 'https://mediafusion.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mediafusion')
        .setDescription('Install and configure MediaFusion addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('MediaFusion')
            .setDescription('Access content from various media sources.')
            .addFields(
                { name: 'Features', value: 
                    '• Multiple media sources\n' +
                    '• High-quality streams\n' +
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
                    .setLabel('Install MediaFusion')
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
