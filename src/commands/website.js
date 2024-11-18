const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { handleCommand } = require('../utils/errorHandler');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('website')
        .setDescription('Get the Vidi website link'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Vidi Website')
            .setDescription(`[Visit our website](${process.env.WEBSITE_URL})`)
            .addFields(
                { name: '🌐 Features', value: 'Browse addons, documentation, and more!' }
            )
            .setFooter({ text: 'Vidi Addons' })
            .setTimestamp();

        await interaction.editReply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
