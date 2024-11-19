const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

const APP_URL = process.env.APP_URL;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('app')
        .setDescription('Get Vidi app download link'),

    async execute(interaction) {
        try {
            if (!APP_URL) {
                throw new Error('App URL not configured in environment variables');
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Vidi App')
                .setDescription('Download our app to start streaming!')
                .addFields(
                    { name: 'Features', value: 
                        '• Easy to use interface\n' +
                        '• Multiple streaming sources\n' +
                        '• Regular updates\n' +
                        '• Cross-platform support'
                    }
                )
                .setFooter({ text: 'Vidi App' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(APP_URL)
                        .setLabel('Download App')
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
            console.error('Error in app command:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ 
                    content: 'An error occurred while processing your request. Please try again later.',
                    ephemeral: true 
                });
            }
        }
    }
};
