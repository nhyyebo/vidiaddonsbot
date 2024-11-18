const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { safeReply } = require('../utils/errorHandler');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('website')
        .setDescription('Get the link to the Vidi Addons website'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Vidi Addons Website')
            .setDescription('Visit our website to browse all available addons and get detailed setup instructions.')
            .addFields(
                { name: 'Features', value: '• Browse all addons\n• Setup guides\n• Documentation\n• Latest updates' }
            )
            .setFooter({ text: 'Vidi Addons' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(process.env.WEBSITE_URL)
                    .setLabel('Visit Website')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL(`${process.env.WEBSITE_URL}/guide`)
                    .setLabel('Setup Guide')
                    .setStyle(ButtonStyle.Link)
            );

        await safeReply(interaction, null, {
            embeds: [embed],
            components: [row]
        });
    }
};
