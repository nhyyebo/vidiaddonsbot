const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

const OWNER_ID = process.env.OWNER_ID;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Submit a suggestion for Nhyira')
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('Your suggestion for Nhyira')
                .setRequired(true)),
    
    async execute(interaction) {
        const suggestion = interaction.options.getString('suggestion');
        const user = interaction.user;

        // Create embed for the suggestion channel
        const suggestionEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('New Suggestion')
            .setDescription(suggestion)
            .addFields(
                { name: 'Suggested by', value: `${user.tag} (${user.id})` }
            )
            .setTimestamp();

        // Send suggestion to the channel
        await interaction.reply({
            content: 'Thank you for your suggestion! It has been sent to him.',
            ephemeral: true
        });

        // DM the owner
        try {
            const owner = await interaction.client.users.fetch(OWNER_ID);
            const dmEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('New Suggestion Received')
                .setDescription(suggestion)
                .addFields(
                    { name: 'Suggested by', value: `${user.tag} (${user.id})` }
                )
                .setTimestamp();

            await owner.send({ embeds: [dmEmbed] });
        } catch (error) {
            console.error('Failed to DM owner:', error);
        }
    }
};
