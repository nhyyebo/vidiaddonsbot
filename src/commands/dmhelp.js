const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { hasRequiredRole } = require('../utils/permissions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmhelp')
        .setDescription('Send help information to a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to send help to')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        if (!await hasRequiredRole(interaction)) {
            return await interaction.reply({
                content: '❌ You do not have permission to use this command.',
                ephemeral: true
            });
        }

        const targetUser = interaction.options.getUser('user');
        if (!targetUser) {
            return await interaction.reply({
                content: '❌ Please specify a valid user.',
                ephemeral: true
            });
        }

        try {
            const helpEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Vidi Bot Help')
                .setThumbnail('attachment://vidi.png')
                .setDescription('Welcome to Vidi! Here\'s how to get started with our addons and features.')
                .addFields(
                    { 
                        name: '📊 Metadata Addons',
                        value: 'Use `/tmdb` or `/trakt` to enhance your media information'
                    },
                    {
                        name: '🔗 Debrid Links',
                        value: 'Set up `/torrentio` or `/easynews` for high-quality streams'
                    },
                    {
                        name: '📑 Catalogs',
                        value: 'Browse content with `/letterboxd` or `/jackett`'
                    },
                    {
                        name: '💬 Subtitles',
                        value: 'Add subtitles using `/opensub`'
                    },
                    {
                        name: '⚙️ Need Help?',
                        value: 'Use `/help` for detailed information about any command'
                    }
                )
                .setFooter({ text: 'Vidi - Your Ultimate Streaming Companion' })
                .setTimestamp();

            await targetUser.send({ 
                embeds: [helpEmbed],
                files: ['./addonicons/vidi.png']
            });

            await interaction.reply({
                content: `✅ Help information has been sent to ${targetUser.tag}`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in dmhelp command:', error);
            await interaction.reply({
                content: `❌ Unable to send DM to ${targetUser.tag}. They might have DMs disabled.`,
                ephemeral: true
            });
        }
    }
};
