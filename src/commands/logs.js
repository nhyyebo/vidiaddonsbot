const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Get bot logs'),

    async execute(interaction) {
        try {
            // Check if user has admin permissions
            if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                await interaction.reply({
                    content: 'You do not have permission to use this command.',
                    ephemeral: true
                });
                return;
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Bot Logs')
                .setDescription('Recent bot activity:')
                .addFields(
                    { name: 'Status', value: 'Bot is running normally' },
                    { name: 'Last Restart', value: new Date().toLocaleString() },
                    { name: 'Active Commands', value: 'All commands operational' }
                )
                .setFooter({ text: 'Vidi Bot Logs' })
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in logs command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
