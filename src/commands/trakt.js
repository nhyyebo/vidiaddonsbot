const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://2ecbbd610840-trakt.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://2ecbbd610840-trakt.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trakt')
        .setDescription('Install and configure Trakt.tv addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#ED2224') // Trakt's brand color
                .setTitle('Trakt Addon')
                .setThumbnail('attachment://trakt.png')
                .setDescription('Trakt is a platform for tracking your watched movies and TV shows, now integrated with Vidi.')
                .addFields(
                    { name: '📝 Features', value: '• Track watched content\n• Sync your watchlist\n• Get personalized recommendations\n• Rate and review content' },
                    { name: '🔑 Requirements', value: 'A Trakt account is required. [Sign up here](https://trakt.tv/auth/join)' },
                    { name: '⚙️ Installation', value: 'Click Configure to connect your Trakt account.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('trakt_install')
                        .setLabel('Install Trakt.tv')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setURL('https://trakt.tv/auth/join')
                        .setLabel('Create Account')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/trakt.png'],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in trakt command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'trakt_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Trakt.tv')
                .setDescription(`Click [here](${MANIFEST_URL}) to install Trakt.tv.\n\nMake sure you have:\n1. Vidi installed on your device\n2. A Trakt.tv account\n3. Configured your account settings`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
