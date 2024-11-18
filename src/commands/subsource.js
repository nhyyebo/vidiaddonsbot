const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://subsource.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://subsource.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subsource')
        .setDescription('Install and configure SubSource addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('SubSource Addon')
                .setThumbnail('attachment://subsource-modified.png')
                .setDescription('Access high-quality subtitles from multiple sources directly in Vidi.')
                .addFields(
                    { name: 'Features', value: 
                        '• Multiple subtitle sources\n' +
                        '• Smart source selection\n' +
                        '• Multiple languages\n' +
                        '• Auto-download support'
                    },
                    { name: 'Installation', value: 'Click Configure to set up your preferences, then Install to add the addon to your Vidi player.' }
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

            const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'subsource-modified.png');

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: [iconPath],
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
