const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://1fe84bc728af-imdb-catalogs.baby-beamup.club/manifest.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imdb')
        .setDescription('Get information about the IMDB addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#F5C518') // IMDB's brand color
                .setTitle('IMDB Addon')
                .setThumbnail('attachment://imdb.png')
                .setDescription('The Internet Movie Database (IMDB) addon provides comprehensive movie and TV show information.')
                .addFields(
                    { name: '📝 Features', value: '• Detailed movie and TV show information\n• Cast and crew details\n• User ratings and reviews\n• Box office data' },
                    { name: '⚙️ Installation', value: 'Click Install to add the IMDB addon to your Vidi player.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('imdb_install')
                        .setLabel('Install IMDb Catalogs')
                        .setStyle(ButtonStyle.Primary)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/imdb.png'],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in imdb command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'imdb_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install IMDb Catalogs')
                .setDescription(`Click [here](${MANIFEST_URL}) to install IMDb Catalogs.\n\nMake sure you have Vidi installed on your device.`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
