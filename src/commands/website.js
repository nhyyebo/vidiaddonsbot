const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('website')
        .setDescription('Get Vidi addons website link'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Vidi Website')
                .setDescription('Visit our website for more information and updates.')
                .addFields(
                    { name: 'Features', value: 
                        '• Latest news and updates\n' +
                        '• Documentation\n' +
                        '• Community forums\n' +
                        '• Support resources'
                    }
                )
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

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    embeds: [embed],
                    components: [row],
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error('Error in website command:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ 
                    content: 'An error occurred while processing your request. Please try again later.',
                    ephemeral: true 
                });
            }
        }
    }
};
