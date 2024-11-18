const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

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
            const ownerId = process.env.OWNER_ID;
            
            if (!ownerId) {
                throw new Error('Owner ID not configured in environment variables');
            }

            // Create an embed for the suggestion
            const suggestionEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('New Suggestion')
                .setDescription(suggestion)
                .addFields(
                    { name: 'Submitted by', value: `${interaction.user.tag} (${interaction.user.id})` },
                    { name: 'Server', value: interaction.guild.name },
                    { name: 'Channel', value: interaction.channel.name }
                )
                .setFooter({ text: 'Vidi Addons Suggestions' })
                .setTimestamp();

            try {
                // Try to send DM to owner
                const owner = await interaction.client.users.fetch(ownerId);
                await owner.send({ embeds: [suggestionEmbed] });
            } catch (dmError) {
                console.error('Failed to send DM to owner:', dmError);
                // Send error notification to owner about DM failure
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('DM Delivery Failed')
                    .setDescription('Failed to deliver suggestion via DM. Please check your DM settings.')
                    .setTimestamp();
                
                try {
                    const owner = await interaction.client.users.fetch(ownerId);
                    await owner.send({ embeds: [errorEmbed] });
                } catch (e) {
                    console.error('Failed to send error notification:', e);
                }
            }

            // Also try to send to suggestions channel if it exists
            const suggestionsChannel = interaction.guild.channels.cache.find(
                channel => channel.name === 'suggestions'
            );

            if (suggestionsChannel) {
                await suggestionsChannel.send({ embeds: [suggestionEmbed] });
            }

            // Reply to user
            await interaction.reply({
                content: 'Thank you for your suggestion! It has been submitted for review.',
                ephemeral: true
            });

        } catch (error) {
            console.error('Error in suggest command:', error);
            
            // Send error notification to owner
            try {
                const errorEmbed = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle('Command Error')
                    .setDescription(`Error in suggest command:\n\`\`\`${error.message}\`\`\``)
                    .addFields(
                        { name: 'User', value: `${interaction.user.tag} (${interaction.user.id})` },
                        { name: 'Server', value: interaction.guild.name },
                        { name: 'Channel', value: interaction.channel.name }
                    )
                    .setTimestamp();

                const owner = await interaction.client.users.fetch(process.env.OWNER_ID);
                await owner.send({ embeds: [errorEmbed] });
            } catch (e) {
                console.error('Failed to send error notification:', e);
            }

            // Reply to user
            await interaction.reply({ 
                content: 'An error occurred while processing your suggestion. The bot owner has been notified.',
                ephemeral: true 
            });
        }
    }
};
