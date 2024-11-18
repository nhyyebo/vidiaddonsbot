const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const MANIFEST_URL = 'https://vidibot.netlify.app/animekitsu';

const CONFIGURE_URL = 'https://anime-kitsu.strem.fun/configure';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('animekitsu')
        .setDescription('Install Anime Kitsu addon'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Anime Kitsu')
            .setDescription('A catalog addon that provides access to Anime Kitsu\'s vast library of anime information.')
            .addFields(
                { name: 'Features', value: 
                    '• Access to Anime Kitsu\'s vast library of anime information\n' +
                    '• Detailed information about titles, including cast, crew, and ratings\n' +
                    '• Easy to use interface'
                }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setURL(MANIFEST_URL)
                    .setLabel('Install Anime Kitsu')
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
    }
};
