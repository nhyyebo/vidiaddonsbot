const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://cyberflix.elfhosted.com/manifest.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cyberflix')
        .setDescription('Get information about the CyberFlix addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('CyberFlix Addon')
                .setThumbnail('attachment://cyber.png')
                .setDescription('CyberFlix is a powerful streaming addon that provides access to a wide variety of content.')
                .addFields(
                    { name: '📝 Features', value: '• Large content library\n• High-quality streams\n• Fast loading times\n• Regular updates' },
                    { name: '⚙️ Installation', value: 'Click Install to add the CyberFlix addon to your Vidi player.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('cyberflix_install')
                        .setLabel('Install Cyberflix')
                        .setStyle(ButtonStyle.Primary)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/cyber.png'],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in cyberflix command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'cyberflix_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Cyberflix')
                .setDescription(`Click [here](${MANIFEST_URL}) to install Cyberflix Catalogs.\n\nMake sure you have Vidi installed on your device.`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
