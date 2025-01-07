const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Bot update information (Owner only)'),

    async execute(interaction) {
        // Check if the user is the owner
        if (interaction.user.id !== process.env.OWNER_ID) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true
            });
        }

        try {
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('VidiBot Update')
                .setDescription('I\'ve just been updated!')
                .addFields(
                    { name: 'Latest Changes', value: 
                        '• Im just better now\n' +
                        ' '},
                    { name: 'Version', value: '2.0', inline: true },
                    { name: 'Date', value: new Date().toLocaleDateString(), inline: true }
                )
                .setFooter({ text: 'Update by Nhyira' })
                .setTimestamp();

            await interaction.reply({ 
                embeds: [embed],
                ephemeral: false 
            });
        } catch (error) {
            console.error('Error in update command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing the update.',
                ephemeral: true 
            });
        }
    }
};
