const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Make a suggestion for Vidi')
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('Your suggestion for Vidi')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const suggestion = interaction.options.getString('suggestion');
            const user = interaction.user;

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('New Suggestion')
                .setDescription(suggestion)
                .addFields(
                    { name: 'Suggested by', value: user.tag }
                )
                .setFooter({ text: 'Vidi Suggestions' })
                .setTimestamp();

            // Send to suggestions channel if it exists
            const suggestionsChannel = interaction.client.channels.cache.find(
                channel => channel.name === 'suggestions'
            );

            if (suggestionsChannel) {
                await suggestionsChannel.send({ embeds: [embed] });
                await interaction.reply({
                    content: 'Thank you for your suggestion! It has been sent to our team.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'Thank you for your suggestion! Unfortunately, the suggestions channel is not available right now.',
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error('Error in suggest command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your suggestion. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
