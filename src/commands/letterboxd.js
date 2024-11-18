const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://letterboxd.almosteffective.com/manifest.json';
const CONFIGURE_URL = 'https://letterboxd.almosteffective.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('letterboxd')
        .setDescription('Install and configure Letterboxd addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#00D735') // Letterboxd's brand color
                .setTitle('Letterboxd Addon')
                .setThumbnail('attachment://letterboxd.png')
                .setDescription('A catalog addon that provides access to Letterboxd\'s vast library of movie information.')
                .addFields(
                    { name: '📝 Features', value: '• Access to Letterboxd\'s vast library\n• Movie information and ratings\n• User lists and reviews\n• Easy to use interface' },
                    { name: '🔑 Requirements', value: 'A Letterboxd account is required. [Sign up here](https://letterboxd.com/signup)' },
                    { name: '⚙️ Installation', value: 'Click Configure to set up your Letterboxd account, then Install to add the addon to your Vidi player.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('letterboxd_install')
                        .setLabel('Install Letterboxd')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setURL('https://letterboxd.com/signup')
                        .setLabel('Create Account')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/letterboxd.png'],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in letterboxd command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'letterboxd_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Letterboxd')
                .setDescription(`Click [here](${MANIFEST_URL}) to install Letterboxd.\n\nMake sure you have:\n1. Vidi installed on your device\n2. A Letterboxd account\n3. Configured your account settings`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
