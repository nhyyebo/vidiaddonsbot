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
                .setDescription('Here are all the available commands:')
                .addFields(
                    { name: 'Addon Commands', value: 
                        '`/trakt` - Install and configure Trakt addon\n' +
                        '`/torrentio` - Install and configure Torrentio addon\n' +
                        '`/tmdb` - Install and configure TMDB addon\n' +
                        '`/subsource` - Install and configure SubSource addon\n' +
                        '`/streamingcatalogs` - Install and configure Streaming Catalogs addon\n' +
                        '`/opensubtitles` - Install and configure OpenSubtitles addon\n' +
                        '`/mediafusion` - Install and configure MediaFusion addon\n' +
                        '`/letterboxd` - Install Letterboxd addon\n' +
                        '`/jackett` - Install and configure Jackett addon\n' +
                        '`/imdb` - Install and configure IMDb addon\n' +
                        '`/easynews` - Install and configure EasyNews addon\n' +
                        '`/cyberflix` - Install and configure Cyberflix addon\n' +
                        '`/comet` - Install and configure Comet addon\n' +
                        '`/cinemeta` - Install Cinemeta addon\n' +
                        '`/animekitsu` - Install and configure Animekitsu addon'
                    },
                    { name: 'Other Commands', value: 
                        '`/help` - Show this help message\n' +
                        '`/setup` - Get started with Vidi'
                    }
                )
                .setFooter({ text: 'Vidi Addons' })
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
