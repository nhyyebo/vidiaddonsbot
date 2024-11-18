const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmhelp')
        .setDescription('Get help via DM'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Vidi Bot Help')
            .setDescription('Here are all the available commands and features:')
            .addFields(
                { name: '📱 App Setup', value: 
                    '1. Download Vidi app from App Store\n' +
                    '2. Install desired addons using commands below\n' +
                    '3. Configure addons with your credentials'
                },
                { name: '🎬 Content Addons', value: 
                    '`/comet` - Debrid streaming\n' +
                    '`/torrentio` - Torrent streaming\n' +
                    '`/easynews` - Usenet streaming\n' +
                    '`/jackett` - Custom torrent indexers\n' +
                    '`/mediafusion` - Multi-source streaming'
                },
                { name: '🔍 Metadata Addons', value: 
                    '`/cinemeta` - Basic metadata\n' +
                    '`/tmdb` - Enhanced metadata\n' +
                    '`/imdb` - IMDb integration\n' +
                    '`/trakt` - Trakt.tv sync\n' +
                    '`/letterboxd` - Letterboxd lists\n' +
                    '`/animekitsu` - Anime metadata\n' +
                    '`/streamingcatalogs` - Streaming catalogs'
                },
                { name: '📝 Subtitle Addons', value: 
                    '`/opensubtitles` - Multiple languages\n' +
                    '`/subsource` - Alternative source'
                },
                { name: '❓ Need More Help?', value: 
                    'Join our community for support:\n' +
                    '• Use `/suggest` for feature requests\n' +
                    '• Ask questions in #help channel'
                }
            )
            .setFooter({ text: 'Vidi Addons - DM Help' })
            .setTimestamp();

        try {
            await interaction.user.send({ embeds: [embed] });
            await interaction.editReply({ 
                content: '✅ I\'ve sent you a DM with help information!',
                ephemeral: true 
            });
        } catch (error) {
            console.error('Error sending DM:', error);
            await interaction.editReply({ 
                content: '❌ I couldn\'t send you a DM. Please make sure you have DMs enabled for this server.',
                ephemeral: true 
            });
        }
    }
};
