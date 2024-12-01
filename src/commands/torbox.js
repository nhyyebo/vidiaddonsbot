const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const GUIDE_URL = 'https://vidi-addons.netlify.app/torbox-guide.html';
const CONFIGURE_URL = 'https://torbox.app/settings';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('torbox')
        .setDescription('Guide and configure Torobx with Vidi '),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#51f542')
                .setTitle('Torbox')
                .setDescription('Access content from Torbox')
                .addFields(
                    { name: 'Guide', value: 'Click for a step-by-step guide to Torbox with Vidi' },
                    { name: 'Configuration', value: 'After installation, use Configure to set up your preferences.' }
                )
                .setImage('https://vidi-addons.netlify.app/addonicons/torbox.png')
                .setFooter({ text: 'Torbox Addon' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(GUIDE_URL)
                        .setLabel('Guide')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in Torbox command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
