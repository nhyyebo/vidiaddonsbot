const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/subsource';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subsource')
        .setDescription('Install Subsource addon'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Subsource')
                .setDescription('Access subtitles from multiple sources.')
                .addFields(
                    { name: 'Features', value: 
                        '• Multiple subtitle sources\n' +
                        '• Various languages\n' +
                        '• Fast search\n' +
                        '• Easy integration'
                    }
                )
                .setFooter({ text: 'Subsource Addon' })
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
            console.error('Error in Subsource command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
