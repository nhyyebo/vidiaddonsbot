const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/cinemeta';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cinemeta')
        .setDescription('Install Cinemeta addon'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#00c9a5')
                .setTitle('Cinemeta')
                .setDescription('Access metadata for movies and TV shows.')
                .setImage('https://vidi-addons.netlify.app/addonicons/cine.jpeg')
                .addFields(
                    { name: 'Features', value: 
                        '• Movie and TV show metadata\n' +
                        '• Posters and artwork\n' +
                        '• Cast information\n' +
                        '• Release dates'
                    }
                )
                .setFooter({ text: 'Cinemeta Addon' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(MANIFEST_URL)
                        .setLabel('Install')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in cinemeta command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
