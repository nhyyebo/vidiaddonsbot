const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows all available Vidi addon commands'),

    async execute(interaction) {
        try {
            const helpEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('📚 Vidi Addon Commands')
                .setDescription('Here are all the available commands to help you manage your Vidi addons:')
                .addFields(
                    {
                        name: '📊 Metadata',
                        value: '`/cinemeta` - The official addon for movie/series metadata\n' +
                               '`/tmdb` - The Movie Database addon'
                    },
                    {
                        name: '🔗 Debrid Links',
                        value: '`/torrentio` - Torrent files with debrid support\n' +
                               '`/mediafusion` - MediaFusion debrid addon\n' +
                               '`/comet` - Comet debrid addon\n' +
                               '`/jackett` - Jackett debrid integration'
                    },
                    {
                        name: '📑 Catalogs',
                        value: '`/imdb` - IMDb catalogs and information\n' +
                               '`/streamingcatalogs` - Streaming services catalogs\n' +
                               '`/trakt` - Trakt.tv integration\n' +
                               '`/animekitsu` - Anime Kitsu catalogs\n' +
                               '`/cyberflix` - Cyberflix catalogs\n' +
                               '`/letterboxd` - Letterboxd integration'
                    },
                    {
                        name: '💬 Subtitles',
                        value: '`/opensubtitles` - OpenSubtitles integration\n' +
                               '`/subsource` - SubSource Subtitles addon'
                    },
                    {
                        name: '🔧 Other',
                        value: '`/easynews` - Easy News+ addon'
                    },
                    {
                        name: '⚙️ Utility Commands',
                        value: '`/app` - Get Vidi app download link\n' +
                               '`/website` - Get Vidi website link\n' +
                               '`/suggest` - Submit a suggestion\n' +
                               '`/logs` - View application logs (Staff only)'
                    }
                )
                .setFooter({ 
                    text: 'Bot and Website created by: @nhyyeb',
                    iconURL: interaction.client.user.displayAvatarURL()
                })
                .setTimestamp();

            await interaction.reply({
                embeds: [helpEmbed],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in help command:', error);
            await interaction.reply({
                content: '❌ An error occurred while showing the help menu. Please try again later.',
                ephemeral: true
            });
        }
    }
};
