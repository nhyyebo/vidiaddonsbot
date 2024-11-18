const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Submit a suggestion')
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('Your suggestion')
                .setRequired(true)),

    async execute(interaction) {
        try {
            const suggestion = interaction.options.getString('suggestion');
            
            // Create an embed for the suggestion
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('New Suggestion')
                .setDescription(suggestion)
                .addFields(
                    { name: 'Submitted by', value: interaction.user.tag }
                )
                .setFooter({ text: 'Vidi Suggestions' })
                .setTimestamp();

            // Send the suggestion to a designated channel (if you have one)
            const suggestionsChannel = interaction.guild.channels.cache.find(
                channel => channel.name === 'suggestions'
            );

            if (suggestionsChannel) {
                await suggestionsChannel.send({ embeds: [embed] });
                await interaction.reply({
                    content: 'Thank you for your suggestion! It has been submitted for review.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'Thank you for your suggestion! However, I couldn\'t find the suggestions channel. Please contact a server administrator.',
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
