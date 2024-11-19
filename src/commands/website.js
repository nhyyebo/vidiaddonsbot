const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

const WEBSITE_URL = process.env.WEBSITE_URL;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('website')
        .setDescription('Get Vidi website link'),

    async execute(interaction) {
        try {
            if (!WEBSITE_URL) {
                throw new Error('Website URL not configured in environment variables');
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Vidi Website')
                .setDescription('Visit our website to explore more features!')
                .addFields(
                    { name: 'Features', value: 
                        '• Browse our catalog\n' +
                        '• Latest updates\n' +
                        '• Community features\n' +
                        '• Support resources'
                    }
                )
                .setFooter({ text: 'Vidi Website' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(WEBSITE_URL)
                        .setLabel('Visit Website')
                        .setStyle(ButtonStyle.Link)
                );

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    embeds: [embed],
                    components: [row],
                    ephemeral: true
                });
            } else if (interaction.deferred) {
                await interaction.editReply({
                    embeds: [embed],
                    components: [row],
                });
            }
        } catch (error) {
            console.error('Error in website command:', error);
            const errorMessage = 'An error occurred while processing your request. Please try again later.';
            
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: errorMessage, ephemeral: true });
            } else if (interaction.deferred) {
                await interaction.editReply({ content: errorMessage });
            }
        }
    }
};
