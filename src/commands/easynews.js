const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const EASYNEWS_URL = 'https://signup.easynews.com/';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('easynews')
        .setDescription('Get Easynews signup link'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Easynews')
                .setDescription('Access Usenet content with Easynews.')
                .setImage('https://vidi-addons.netlify.app/addonicons/easynews.jpeg')
                .addFields(
                    { name: 'Features', value: 
                        '• Browser-based access\n' +
                        '• Fast downloads\n' +
                        '• No additional software needed\n' +
                        '• VPN included'
                    }
                )
                .setFooter({ text: 'Easynews' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(EASYNEWS_URL)
                        .setLabel('Sign Up')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in easynews command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
