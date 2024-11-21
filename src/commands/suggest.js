const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

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

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('markDone')
                        .setLabel('Mark as Done')
                        .setStyle(ButtonStyle.Primary)
                );

            const ownerId = process.env.OWNER_ID;
            if (!ownerId) {
                await interaction.reply({
                    content: 'An error occurred while processing your suggestion. Please try again later.',
                    ephemeral: true
                });
                return;
            }

            const owner = await interaction.client.users.fetch(ownerId);
            await owner.send({ embeds: [embed], components: [row] });
            
            await interaction.reply({
                content: 'Thank you for your suggestion! It has been sent to our team.',
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in suggest command:', error);
            if (!interaction.replied) {
                await interaction.reply({ 
                    content: 'An error occurred while processing your suggestion. Please try again later.',
                    ephemeral: true 
                });
            }
        }
    }
};

// Handle button interactions
module.exports.client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'markDone') {
        try {
            const suggestion = interaction.message.embeds[0].description;
            const suggestedBy = interaction.message.embeds[0].fields[0].value;
            const user = await interaction.client.users.fetch(suggestedBy.slice(1, -1).split('#')[0]);
            await user.send('Your suggestion has been marked as done!');
            await interaction.reply({ content: 'Marked as done and user notified.', ephemeral: true });
        } catch (error) {
            console.error('Error handling button interaction:', error);
            if (!interaction.replied) {
                await interaction.reply({
                    content: 'An error occurred while processing your request. Please try again later.',
                    ephemeral: true
                });
            }
        }
    }
});
