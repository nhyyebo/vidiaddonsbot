const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://mediafusion.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://mediafusion.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mediafusion')
        .setDescription('Install and configure MediaFusion addon'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('MediaFusion Addon')
            .setDescription('A debrid link addon that provides access to a wide range of media files.')
            .addFields(
                { name: 'Features', value: '• Access to a large library of media files\n• Support for multiple debrid services\n• Easy to use interface' },
                { name: 'Installation', value: 'Click Configure to set up your debrid service, then Install to add MediaFusion to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('mediafusion_install')
                    .setLabel('Install MediaFusion')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'mediafusion_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install MediaFusion')
                .setDescription(`Click [here](${MANIFEST_URL}) to install MediaFusion.\n\nMake sure you have:\n1. Vidi installed on your device\n2. Configured your debrid service`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
