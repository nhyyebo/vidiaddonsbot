const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'https://vidibot.netlify.app/subsource';
const CONFIGURE_URL = 'https://subsource.strem.bar/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subsource')
        .setDescription('Install and configure SubSource addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('SubSource Subtitles')
                .setDescription('A subtitle addon that provides access to SubSource\'s vast library of subtitles.')
                .addFields(
                    { name: 'Features', value: 
                        '• Access to SubSource\'s vast library of subtitles\n' +
                        '• Support for multiple languages\n' +
                        '• Easy to use interface'
                    }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL(MANIFEST_URL)
                        .setLabel('Install SubSource')
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
            console.error('Error in subsource command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    }
};
