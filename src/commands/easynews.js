const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://easynews.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://easynews.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('easynews')
        .setDescription('Install and configure EasyNews addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('EasyNews')
            .setDescription('A powerful addon that provides access to EasyNews content.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to EasyNews content\n' +
                    '• High-quality streams\n' +
                    '• Regular updates\n' +
                    '• Easy configuration'
                },
                { name: 'Installation', value: 'Click Install to add EasyNews to your Vidi player.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install EasyNews')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL(CONFIGURE_URL)
                    .setLabel('Configure')
                    .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                    .setURL('https://signup.easynews.com')
                    .setLabel('Get Easynews Account')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.editReply({
            embeds: [embed],
            components: [row]
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
