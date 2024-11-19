const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get information about available commands'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Vidi Bot Commands')
                .setDescription('Here are all available commands:')
                .addFields(
                    { name: 'App & Website', value: 
                        '`/app` - Get Vidi app download link\n' +
                        '`/website` - Get Vidi website link'
                    },
                    { name: 'Addons', value: 
                        '`/comet` - Install Comet addon\n' +
                        '`/easynews` - Get Easynews signup\n' +
                        '`/torrentio` - Install Torrentio addon\n' +
                        '`/jackett` - Install Jackett addon'
                    },
                    { name: 'Media Sources', value: 
                        '`/tmdb` - Search TMDb\n' +
                        '`/imdb` - Search IMDb\n' +
                        '`/trakt` - Search Trakt\n' +
                        '`/letterboxd` - Search Letterboxd'
                    },
                    { name: 'Subtitles', value: 
                        '`/opensubtitles` - Search OpenSubtitles\n' +
                        '`/subsource` - Install Subsource addon'
                    },
                    { name: 'Other', value: 
                        '`/suggest` - Make a suggestion\n' +
                        '`/dmhelp` - Get help via DM'
                    }
                )
                .setFooter({ text: 'Vidi Bot Help' })
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in help command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
