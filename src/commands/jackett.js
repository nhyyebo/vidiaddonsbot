const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://jackettio.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://jackettio.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jackett')
        .setDescription('Get information about the Jackett addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Jackett Addon')
                .setThumbnail('attachment://jackett.png')
                .setDescription('Jackett is a powerful indexer that works with various torrent sites to provide comprehensive search results.')
                .addFields(
                    { name: '📝 Features', value: '• Multiple torrent site support\n• Advanced search capabilities\n• Fast indexing\n• Customizable trackers' },
                    { name: '🔑 Requirements', value: 'A Jackett server and API key are required.' },
                    { name: '⚙️ Installation', value: 'Click Configure to set up your Jackett server details and API key.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('jackett_install')
                        .setLabel('Install Jackett')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/jackett.png'],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in jackett command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'jackett_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Jackett')
                .setDescription(`Click [here](${MANIFEST_URL}) to install Jackett.\n\nMake sure you have Vidi installed on your device.`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
