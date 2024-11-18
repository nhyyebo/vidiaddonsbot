const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { handleCommand } = require('../utils/errorHandler');

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
                    { name: '📱 App Commands', value: '`/app` - Get Vidi app download link\n`/website` - Get Vidi website link' },
                    { name: '📊 Metadata', value: 
                        '`/cinemeta` - The official addon for movie/series metadata\n' +
                        '`/tmdb` - The Movie Database addon\n' +
                        '`/imdb` - IMDb catalogs and information\n' +
                        '`/trakt` - Trakt.tv integration\n' +
                        '`/letterboxd` - Letterboxd integration\n' +
                        '`/animekitsu` - Anime Kitsu catalogs\n' +
                        '`/streamingcatalogs` - Streaming services catalogs'
                    },
                    { name: '🔗 Debrid Links', value: 
                        '`/torrentio` - Torrent files with debrid support\n' +
                        '`/mediafusion` - MediaFusion debrid addon\n' +
                        '`/comet` - Comet debrid addon\n' +
                        '`/jackett` - Jackett debrid integration\n' +
                        '`/easynews` - Easy News+ addon'
                    },
                    { name: '📑 Catalogs', value: 
                        '`/cyberflix` - Cyberflix catalogs'
                    },
                    { name: '💬 Subtitles', value: 
                        '`/opensubtitles` - OpenSubtitles integration\n' +
                        '`/subsource` - SubSource Subtitles addon'
                    },
                    { name: '❓ Help Commands', value: 
                        '`/help` - Show this help message\n' +
                        '`/suggest` - Submit a suggestion\n' +
                        '`/logs` - View application logs (Staff only)'
                    }
                )
                .setFooter({ 
                    text: 'Bot and Website created by: @nhyyeb',
                    iconURL: interaction.client.user.displayAvatarURL()
                })
                .setTimestamp();

            await interaction.editReply({ embeds: [helpEmbed] });
        } catch (error) {
            handleCommand(interaction, error);
        }
    }
};
