const { Client, Intents } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'reactionrole',
    description: 'Assigns a role based on reaction',
    execute(message, args) {
        const roleId = process.env.REACTION_ROLE_ID;
        const adminRoleId = process.env.ADMIN_ROLE_ID;
        const userId = process.env.USER_ID;

        if (!message.member.roles.cache.has(adminRoleId) && message.author.id !== userId) {
            return message.reply('You do not have permission to use this command.');
        }

        const filter = (reaction, user) => {
            return !user.bot;
        };

        message.channel.send('React to this message to get the role!').then(sentMessage => {
            sentMessage.react('👍');

            const collector = sentMessage.createReactionCollector({ filter, dispose: true });

            collector.on('collect', (reaction, user) => {
                const member = message.guild.members.cache.get(user.id);
                member.roles.add(roleId).catch(console.error);
            });

            collector.on('remove', (reaction, user) => {
                const member = message.guild.members.cache.get(user.id);
                member.roles.remove(roleId).catch(console.error);
            });
        });
    },
};
