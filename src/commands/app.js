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
                throw new Error('App URL not configured');
            }

            const embed = new EmbedBuilder()
                .setColor('#000000')
                .setTitle('Vidi App')
                .setDescription('Download Vidi  to start streaming!')
                .setImage('https://d1nxzqpcg2bym0.cloudfront.net/itunes_connect/6648776878/eb5590d0-aae9-11ef-8e5a-73994c261908/128x128')
                .addFields(
                    { name: 'Features', value: 
                        '• Easy to use interface\n' +
                        '• Multiple streaming sources\n' +
                        '• Regular updates\n' +
                        '• Amazing community support'
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

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in app command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
