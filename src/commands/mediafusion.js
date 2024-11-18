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
            .setDescription('A debrid link addon that provides access to a wide range of media files.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to a large library of media files\n' +
                    '• Support for multiple debrid services\n' +
                    '• Easy to use interface'
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
            components: [row]
        });
    }
};
