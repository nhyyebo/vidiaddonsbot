const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

const APP_URL = process.env.APP_STORE_URL;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('app')
        .setDescription('Get Vidi app download link'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Download Vidi')
                .setDescription('Get the Vidi app for your platform:')
                .addFields(
                    { name: 'Platforms', value: 
                        '• ATV\n' +
                        '• iOS (coming soon)'
                    }
                )
                .setFooter({ text: 'Vidi App' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(APP_URL)
                        .setLabel('Download Vidi')
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
