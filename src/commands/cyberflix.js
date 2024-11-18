const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/cyberflix';
const CONFIGURE_URL = 'https://cyberflix.elfhosted.com/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cyberflix')
        .setDescription('Install and configure CyberFlix addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('CyberFlix')
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
                    .setLabel('Install CyberFlix')
                    .setStyle(ButtonStyle.Link),
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
        if (interaction.customId === 'cyberflix_install') {
            await interaction.editReply({
                content: `To install CyberFlix, click this link:\n${MANIFEST_URL}`,
                components: [],
                embeds: []
            });
        }
    }
};
