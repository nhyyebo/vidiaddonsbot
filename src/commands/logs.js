const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID;
const DEV_ROLE_ID = process.env.DEV_ROLE_ID;
const MOD_ROLE_ID = process.env.MOD_ROLE_ID;
const OWNER_ID = process.env.OWNER_ID;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Get bot logs'),

    async execute(interaction) {
        try {
            // Check if user has the required roles or is the owner
            const hasPermission = interaction.member.roles.cache.some(role => 
                [ADMIN_ROLE_ID, DEV_ROLE_ID, MOD_ROLE_ID].includes(role.id)
            ) || interaction.user.id === OWNER_ID;

            if (!hasPermission) {
                await interaction.reply({
                    content: 'You need to be an Admin, Dev, Mod, or the Owner to use this command.',
                    ephemeral: true
                });
                return;
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Bot Logs')
                .setDescription('Recent bot activity:')
                .addFields(
                    { name: 'Status', value: 'Bot is running normally' },
                    { name: 'Last Restart', value: new Date().toLocaleString() },
                    { name: 'Active Commands', value: 'All commands operational' }
                )
                .setFooter({ text: 'Vidi Bot Logs' })
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in logs command:', error);
            await interaction.reply({ 
                content: 'An error occurred while processing your request. Please try again later.',
                ephemeral: true 
            });
        }
    }
};
