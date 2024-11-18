const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('website')
        .setDescription('Get Vidi addons website link'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Vidi Addons Website')
            .setDescription('Visit our website for more information about Vidi addons.')
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const websiteUrl = process.env.WEBSITE_URL;
        if (!websiteUrl) {
            throw new Error('Website URL not configured in environment variables');
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(websiteUrl)
                    .setLabel('Visit Website')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    }
};
