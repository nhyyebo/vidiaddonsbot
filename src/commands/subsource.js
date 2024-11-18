const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
                .setTitle('SubSource Subtitles Addon')
                .setThumbnail('attachment://subsource.png')
                .setDescription('A subtitle addon that provides access to SubSource\'s vast library of subtitles.')
                .addFields(
                    { name: 'Features', value: '• Access to SubSource\'s vast library of subtitles\n• Support for multiple languages\n• Easy to use interface' },
                    { name: 'Installation', value: 'Click Configure to set up your SubSource account, then Install to add the addon to your Vidi player.' }
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
                files: ['./addonicons/subsource.png'],
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
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install SubSource')
                .setDescription(`Click [here](${MANIFEST_URL}) to install SubSource Subtitles.\n\nMake sure you have:\n1. Vidi installed on your device\n2. A SubSource account\n3. Configured your account settings`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
