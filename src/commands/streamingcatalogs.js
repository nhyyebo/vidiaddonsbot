const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'vidi://7a82163c306e-stremio-netflix-catalog-addon.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://7a82163c306e-stremio-netflix-catalog-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('streamingcatalogs')
        .setDescription('Install and configure Streaming Catalogs addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Streaming Catalogs')
            .setDescription('A catalog addon that provides access to a wide range of streaming services.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to a large library of streaming services\n' +
                    '• Detailed information about titles\n' +
                    '• Cast and crew details\n' +
                    '• Easy to use interface'
                },
                { name: 'Installation', value: 'Click Configure to set up this addon with your streaming services.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install Streaming Catalogs')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.editReply({
            embeds: [embed],
            components: [row]
        });
    }
};
