const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://subsource.strem.bar/manifest.json';
const CONFIGURE_URL = 'https://subsource.strem.bar/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subsource')
        .setDescription('Install and configure SubSource Subtitles addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('SubSource Subtitles')
                .setDescription('A subtitle addon that provides access to SubSource\'s vast library of subtitles.')
                .addFields(
                    { name: 'Features', value: 
                        '• Access to SubSource\'s vast library\n' +
                        '• Support for multiple languages\n' +
                        '• Easy to use interface'
                    },
                    { name: 'Installation', value: 'Click Configure to set up this addon with your SubSource account.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('subsource_install')
                        .setLabel('Install SubSource')
                        .setStyle(ButtonStyle.Primary),
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
    },

    async handleButton(interaction) {
        if (interaction.customId === 'subsource_install') {
            await interaction.editReply({
                content: `To install SubSource, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
