const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { hasRequiredRole } = require('../utils/permissions');
const ms = require('ms');
const fs = require('fs');
const path = require('path');

const giveawayFilePath = path.join(__dirname, '..', '..', 'manifest.json');

function saveGiveaway(giveaway) {
    let giveaways = [];
    if (fs.existsSync(giveawayFilePath)) {
        giveaways = JSON.parse(fs.readFileSync(giveawayFilePath));
    }
    giveaways.push(giveaway);
    fs.writeFileSync(giveawayFilePath, JSON.stringify(giveaways, null, 2));
}

function loadGiveaways() {
    if (fs.existsSync(giveawayFilePath)) {
        return JSON.parse(fs.readFileSync(giveawayFilePath));
    }
    return [];
}

function removeGiveaway(messageId) {
    let giveaways = loadGiveaways();
    giveaways = giveaways.filter(giveaway => giveaway.messageId !== messageId);
    fs.writeFileSync(giveawayFilePath, JSON.stringify(giveaways, null, 2));
}

async function resumeGiveaways(client) {
    const giveaways = loadGiveaways();
    for (const giveaway of giveaways) {
        const channel = await client.channels.fetch(giveaway.channelId);
        const message = await channel.messages.fetch(giveaway.messageId);
        const remainingTime = giveaway.endTime - Date.now();
        if (remainingTime > 0) {
            setTimeout(async () => {
                await endGiveaway(client, giveaway);
            }, remainingTime);
        } else {
            await endGiveaway(client, giveaway);
        }
    }
}

async function endGiveaway(client, giveaway) {
    const channel = await client.channels.fetch(giveaway.channelId);
    const message = await channel.messages.fetch(giveaway.messageId);
    const participants = giveaway.participants;

    if (participants.length === 0) {
        await channel.send('No valid entries, giveaway cancelled.');
        return;
    }

    const winnerId = participants[Math.floor(Math.random() * participants.length)];
    const winner = await client.users.fetch(winnerId);

    await channel.send(`Congratulations ${winner}! You won the **${giveaway.prize}**! 🎉`);
    try {
        await winner.send(`Congratulations! You won the **${giveaway.prize}** in the giveaway! 🎉`);
    } catch (error) {
        if (error.code === 50007) {
            await channel.send(`I could not send a DM to ${winner}, but they have won the giveaway!`);
        } else {
            console.error('Failed to send DM:', error);
        }
    }

    removeGiveaway(giveaway.messageId);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Start a giveaway')
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Duration of the giveaway (e.g., 1m, 1h, 1d)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('prize')
                .setDescription('The prize for the giveaway')
                .setRequired(true)),

    async execute(interaction) {
        if (!await hasRequiredRole(interaction)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const duration = interaction.options.getString('duration');
        const prize = interaction.options.getString('prize');
        const time = ms(duration);

        if (!time) {
            return interaction.reply({ content: 'Invalid duration format. Please use a valid format (e.g., 1m, 1h, 1d).', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle('🎉 Giveaway! 🎉')
            .setDescription(`Prize: **${prize}**\nClick the button below to enter!\nTime: **${duration}**`)
            .setColor('#00FF00')
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('enter_giveaway')
                    .setLabel('Enter Giveaway')
                    .setStyle(ButtonStyle.Primary)
            );

        const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

        const filter = i => i.customId === 'enter_giveaway' && !i.user.bot;
        const collector = message.createMessageComponentCollector({ filter, time });

        const participants = new Set();

        collector.on('collect', async i => {
            participants.add(i.user.id);
            await i.reply({ content: 'You have entered the giveaway!', ephemeral: true });
            try {
                await i.user.send(`You have entered the giveaway for **${prize}**!`);
            } catch (error) {
                if (error.code === 50007) {
                    await i.followUp({ content: 'I could not send you a DM, but you have been entered into the giveaway!', ephemeral: true });
                } else {
                    console.error('Failed to send DM:', error);
                }
            }
        });

        collector.on('end', async () => {
            const participantIds = Array.from(participants);
            const giveaway = {
                messageId: message.id,
                channelId: message.channel.id,
                prize,
                participants: participantIds,
                endTime: Date.now() + time
            };
            saveGiveaway(giveaway);

            if (participantIds.length === 0) {
                await interaction.followUp({ content: 'No valid entries, giveaway cancelled.', ephemeral: true });
                removeGiveaway(message.id);
                return;
            }

            setTimeout(async () => {
                await endGiveaway(interaction.client, giveaway);
            }, time);
        });
    }
};

module.exports.resumeGiveaways = resumeGiveaways;