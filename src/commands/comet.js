const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'vidi://comet.elfhosted.com/manifest.json';
const CONFIGURE_URL = 'https://comet.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comet')
        .setDescription('Install and configure Comet addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Comet')
            .setDescription('A powerful addon that provides access to multiple streaming sources.')
            .addFields(
                { name: 'Features', value: 
                    '• Multiple streaming sources\n' +
                    '• High-quality content\n' +
                    '• Regular updates\n' +
                    '• Easy configuration'
                },
                { name: 'Installation', value: 'Click Configure to set up this addon with your preferences.' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install Comet')
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
    },

    async handleButton(interaction) {
        if (interaction.customId === 'comet_install') {
            await interaction.editReply({
                content: `To install Comet, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
