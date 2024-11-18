const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const MANIFEST_URL = 'vidi://b89262c192b0-stremio-easynews-addon.baby-beamup.club/manifest.json';
const CONFIGURE_URL = 'https://b89262c192b0-stremio-easynews-addon.baby-beamup.club/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('easynews')
        .setDescription('Get information about the EasyNews addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('EasyNews Addon')
                .setThumbnail('attachment://easynews.jpeg')
                .setDescription('EasyNews is a premium Usenet service that provides fast and reliable access to content.')
                .addFields(
                    { name: '📝 Features', value: '• High-speed downloads\n• Extensive content library\n• SSL encryption\n• Global server network' },
                    { name: '🔑 Requirements', value: 'An EasyNews account is required. [Sign up here](https://easynews.com)' },
                    { name: '⚙️ Installation', value: 'Click Configure to set up your EasyNews credentials.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('easynews_install')
                        .setLabel('Install Easy News+')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setURL(CONFIGURE_URL)
                        .setLabel('Configure')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: ['./addonicons/easynews.jpeg'],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in easynews command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        if (interaction.customId === 'easynews_install') {
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Easy News+')
                .setDescription(`Click [here](${MANIFEST_URL}) to install Easy News+.\n\nMake sure you have:\n1. Vidi installed on your device\n2. An Easy News+ account\n3. Configured your account settings`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
