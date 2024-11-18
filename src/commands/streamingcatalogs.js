const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const path = require('path');

const MANIFEST_URL = 'vidi://streamingcatalogs.elfhosted.com/manifest.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('streamingcatalogs')
        .setDescription('Install Streaming Catalogs addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Streaming Catalogs Addon')
            .setThumbnail('attachment://streamingcatalogs-modified.png')
            .setDescription('Access comprehensive streaming service catalogs directly in Vidi.')
            .addFields(
                { name: 'Features', value: 
                    '• Multiple streaming services\n' +
                    '• Updated catalogs\n' +
                    '• Service availability info\n' +
                    '• Regional content data'
                },
                { name: 'Installation', value: 'Click Install to add the Streaming Catalogs addon to your Vidi player. No configuration required!' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('streamingcatalogs_install')
                    .setLabel('Install Streaming Catalogs')
                    .setStyle(ButtonStyle.Primary)
            );

        const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'streamingcatalogs-modified.png');

        await interaction.editReply({
            embeds: [embed],
            components: [row],
            files: [iconPath]
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'streamingcatalogs_install') {
            await interaction.editReply({
                content: `To install Streaming Catalogs, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
