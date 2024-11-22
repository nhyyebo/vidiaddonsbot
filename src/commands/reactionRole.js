const { Client, Intents, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionrole')
        .setDescription('Assigns a role based on reaction'),
    name: 'reactionrole',
    description: 'Assigns a role based on reaction',
    execute(message, args) {
        const roleId = process.env.REACTION_ROLE_ID;
        const adminRoleId = process.env.ADMIN_ROLE_ID;
        const devRoleId = process.env.DEV_ROLE_ID;
        const modRoleId = process.env.MOD_ROLE_ID;
        const ownerId = process.env.OWNER_ID;

        if (!message.member.roles.cache.has(adminRoleId) &&
            !message.member.roles.cache.has(devRoleId) &&
            !message.member.roles.cache.has(modRoleId) &&
            message.author.id !== ownerId) {
            return message.reply('You do not have permission to use this command.');
        }

        const filter = (reaction, user) => {
            return !user.bot;
        };

        try {
            message.channel.send('React to this message to get the member role!').then(sentMessage => {
                sentMessage.react('👍');

                const collector = sentMessage.createReactionCollector({ filter, dispose: true });

                collector.on('collect', (reaction, user) => {
                    const member = message.guild.members.cache.get(user.id);
                    member.roles.add(roleId).catch(error => {
                        console.error('Failed to add role:', error);
                        message.channel.send(`Failed to add role to ${user.username}.`);
                    });
                });

                collector.on('remove', (reaction, user) => {
                    const member = message.guild.members.cache.get(user.id);
                    member.roles.remove(roleId).catch(error => {
                        console.error('Failed to remove role:', error);
                        message.channel.send(`Failed to remove role from ${user.username}.`);
                    });
                });
            });
        } catch (error) {
            console.error('Error sending message or setting up collector:', error);
            message.channel.send('An error occurred while setting up the reaction role.');
        }
    },
};
