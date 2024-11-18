const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'https://vidibot.netlify.app/easynews';
const CONFIGURE_URL = 'https://b89262c192b0-stremio-easynews-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('easynews')
        .setDescription('Install and configure Easy News+ addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Easy News+')
            .setDescription('An addon that provides access to Easy News+.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to Easy News+\n' +
                    '• Easy to use interface'
                }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install Easy News+')
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
    }
};
