const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/letterboxd';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('letterboxd')
        .setDescription('Install Letterboxd addon'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Letterboxd')
                .setDescription('Access your Letterboxd watchlist and reviews.')
                .addFields(
                    { name: 'Features', value: 
                        '• Import your watchlist\n' +
                        '• View your reviews\n' +
                        '• Discover new movies\n' +
                        '• Track your watched films'
                    }
                )
                .setFooter({ text: 'Letterboxd Addon' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(MANIFEST_URL)
                        .setLabel('🔗Install')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in Letterboxd command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
