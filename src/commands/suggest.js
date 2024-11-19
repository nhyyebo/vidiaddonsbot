const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const SUGGESTIONS_CHANNEL_ID = process.env.SUGGESTIONS_CHANNEL_ID;

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
            
            // Create a suggestion embed
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('New Suggestion')
                .setDescription(suggestion)
                .setFooter({ 
                    text: `Suggested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL()
                })
                .setTimestamp();

            // Get the suggestions channel
            const suggestionsChannel = interaction.client.channels.cache.get(SUGGESTIONS_CHANNEL_ID);
            
            if (!suggestionsChannel) {
                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        content: 'Could not find the suggestions channel. Please contact an administrator.',
                        ephemeral: true
                    });
                }
                return;
            }

            // Send the suggestion to the channel
            const message = await suggestionsChannel.send({ embeds: [embed] });
            
            // Add reaction buttons
            await message.react('👍');
            await message.react('👎');

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: 'Your suggestion has been submitted! Thank you for your feedback.',
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error('Error in suggest command:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ 
                    content: 'An error occurred while submitting your suggestion. Please try again later.',
                    ephemeral: true 
                });
            }
        }
    }
};
