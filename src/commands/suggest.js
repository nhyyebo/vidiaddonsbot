const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { handleCommand } = require('../utils/errorHandler');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Submit a suggestion for Vidi')
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('Your suggestion for Vidi')
                .setRequired(true)),

    async execute(interaction) {
        const suggestion = interaction.options.getString('suggestion');
        const suggestionsChannel = interaction.client.channels.cache.get(process.env.SUGGESTIONS_CHANNEL_ID);

        if (!suggestionsChannel) {
            await interaction.editReply({
                content: '❌ Suggestions channel not found. Please contact an administrator.',
                ephemeral: true
            });
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('New Suggestion')
            .setDescription(suggestion)
            .addFields(
                { name: 'Suggested by', value: interaction.user.tag }
            )
            .setFooter({ text: 'Vidi Suggestions' })
            .setTimestamp();

        try {
            const message = await suggestionsChannel.send({ embeds: [embed] });
            await message.react('👍');
            await message.react('👎');

            await interaction.editReply({
                content: '✅ Your suggestion has been submitted! Thank you for your feedback.',
                ephemeral: true
            });
        } catch (error) {
            await interaction.editReply({
                content: '❌ There was an error submitting your suggestion. Please try again later.',
                ephemeral: true
            });
        }
    }
};
