const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('app')
        .setDescription('Get information about the Vidi app'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Vidi App')
                .setThumbnail('attachment://vidi.png')
                .setDescription('Vidi is your ultimate streaming companion, bringing all your favorite content together in one place.')
                .addFields(
                    { 
                        name: '📱 Features',
                        value: '• Stream movies and TV shows\n• Multiple addon support\n• Real-Debrid integration\n• Beautiful interface\n• Cross-platform support'
                    },
                    {
                        name: '🌐 Unofficial Website',
                        value: `[Visit my unofficial Vidi addons website](${process.env.WEBSITE_URL})`
                    },
                    {
                        name: '📲 App Store',
                        value: `[Download Vidi from App Store](${process.env.APP_STORE_URL})`
                    },
                    {
                        name: '🤖 Bot Commands',
                        value: 'Use `/help` to see all available commands and addons!'
                    }
                )
                .setFooter({ text: 'Vidi - Your Ultimate Streaming Companion' })
                .setTimestamp();

            const iconPath = path.join(__dirname, '..', '..', 'addonicons', 'vidi.png');

            await interaction.reply({
                embeds: [embed],
                files: [iconPath],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in app command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching app information. Please try again later.',
                ephemeral: true
            });
        }
    }
};
