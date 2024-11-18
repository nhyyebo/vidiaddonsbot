const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('app')
        .setDescription('Get Vidi app download link'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Download Vidi')
            .setDescription('Get the Vidi app for your platform:')
            .addFields(
                { name: 'Platforms', value: 
                    '• ATV\n' +
                    '• iOS'
                }
            )
            .setFooter({ text: 'Vidi App' })
            .setTimestamp();

        const appUrl = process.env.APP_STORE_URL;
        if (!appUrl) {
            throw new Error('App Store URL not configured in environment variables');
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(appUrl)
                    .setLabel('Download Vidi')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    }
};
