const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://comet.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://comet.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comet')
        .setDescription('Install and configure Comet addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Comet Addon')
                .setThumbnail('attachment://comet-modified.png')
                .setDescription('A debrid link addon that provides access to a wide range of media files.')
                .addFields(
                    { name: 'Features', value: '• Access to a large library of media files\n• Support for multiple debrid services\n• Easy to use interface' },
                    { name: 'Installation', value: 'Click Configure to set up your debrid service, then Install to add Comet to your Vidi player.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('comet_install')
                        .setLabel('Install Comet')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                        .setURL('https://real-debrid.com')
                        .setLabel('Get Real-Debrid')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/comet-modified.png'],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in comet command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'comet_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Comet')
                .setDescription(`Click [here](${MANIFEST_URL}) to install Comet.\n\nMake sure you have:\n1. Vidi installed on your device\n2. Configured your debrid service`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
