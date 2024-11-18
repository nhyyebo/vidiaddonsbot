const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://2ecbbd610840-opensubtitles.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://opensubtitlesv3-pro.dexter21767.com/configure/';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opensubtitles')
        .setDescription('Install and configure OpenSubtitles addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('OpenSubtitles Addon')
                .setThumbnail('attachment://opensub.png')
                .setDescription('A subtitle addon that provides access to OpenSubtitles\' vast library of subtitles.')
                .addFields(
                    { name: '📝 Features', value: '• Access to OpenSubtitles\' vast library\n• Support for multiple languages\n• Easy to use interface' },
                    { name: '🔑 Requirements', value: 'An OpenSubtitles account is required. [Sign up here](https://www.opensubtitles.com/en/users/sign_up)' },
                    { name: '⚙️ Installation', value: 'Click Configure to set up your OpenSubtitles account, then Install to add the addon to your Vidi player.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('opensubtitles_install')
                        .setLabel('Install OpenSubtitles')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setURL('https://www.opensubtitles.com/en/users/sign-up')
                        .setLabel('Create Account')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/opensub.png'],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in opensubtitles command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'opensubtitles_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install OpenSubtitles')
                .setDescription(`Click [here](${MANIFEST_URL}) to install OpenSubtitles.\n\nMake sure you have:\n1. Vidi installed on your device\n2. An OpenSubtitles account\n3. Configured your API credentials`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
