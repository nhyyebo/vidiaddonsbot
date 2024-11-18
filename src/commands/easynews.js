const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://easynews.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://easynews.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('easynews')
        .setDescription('Install and configure Easynews addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Easynews Addon')
            .setThumbnail('attachment://easynews-modified.png')
            .setDescription('Access high-quality content from Easynews directly in Vidi.')
            .addFields(
                { name: 'Features', value: 
                    '• High-speed downloads\n' +
                    '• Large content library\n' +
                    '• Multiple quality options\n' +
                    '• Global server network'
                },
                { name: 'Installation', value: 'Click Configure to set up your Easynews account, then Install to add the addon to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('easynews_install')
                    .setLabel('Install Easynews')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL('https://signup.easynews.com')
                    .setLabel('Get Easynews Account')
                    .setStyle(ButtonStyle.Link)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'easynews-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'easynews_install') {
            await interaction.editReply({
                content: `To install Easynews, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
