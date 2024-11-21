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

            const userId = user.id;
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('New Suggestion')
                .setDescription(suggestion)
                .addFields(
                    { name: 'Suggested by', value: `<@${userId}>` }
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
                if (!interaction.replied) {
                    await interaction.reply({
                        content: 'An error occurred while processing your suggestion. Please try again later.',
                        ephemeral: true
                    });
                }
                return;
            }

            const owner = await interaction.client.users.fetch(ownerId);
            await owner.send({ embeds: [embed], components: [row] });

            if (!interaction.replied) {
                await interaction.reply({
                    content: 'Thank you for your suggestion! It has been sent to our team.',
                    ephemeral: true
                });
            }
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
