const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmhelp')
        .setDescription('Get help via DM'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Vidi Help')
                .setDescription('Here are some helpful resources:')
                .addFields(
                    { name: 'Discord Support', value: '@Nhyira for specific addon help!' },
                    
                    { name: 'Must Have', value: 
                        '• Cinemeta\n' +
                        '• Torrentio \n' 
                        
                    },
                    { name: 'Have a suggestion?', value: 'Use `/suggest` to submit specific questions or issues.' },
                    { name: 'Note', value: 'Please use /help for all the commands, with love from Vidi staff!' }
                )
                .setFooter({ text: 'Vidi Support' })
                .setTimestamp();

            await interaction.user.send({ embeds: [embed] })
                .then(async () => {
                    await interaction.reply({
                        content: 'I\'ve sent you a DM with help information!',
                        ephemeral: true
                    });
                })
                .catch(async (error) => {
                    console.error('Could not send DM:', error);
                    await interaction.reply({
                        content: 'I couldn\'t send you a DM. Please make sure you have DMs enabled.',
                        ephemeral: true
                    });
                });
        } catch (error) {
            console.error('Error in dmhelp command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
