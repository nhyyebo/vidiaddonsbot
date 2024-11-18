const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('torrentio')
        .setDescription('Install and configure Torrentio addon'),
    
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Torrentio Addon')
                .setThumbnail('attachment://torrentio.png')
                .setDescription('Torrentio is a powerful addon that provides high-quality streaming sources when used with Real-Debrid or AllDebrid.')
                .addFields(
                    { name: 'Features', value: '• High-quality sources\n• Real-Debrid integration\n• AllDebrid integration\n• Multiple language support' },
                    { name: 'Requirements', value: 'You need a Real-Debrid or AllDebrid account to use this addon.' }
                )
                .setFooter({ text: 'Vidi Addons' })
                .setTimestamp();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('install_torrentio_rd')
                        .setLabel('Install with Real-Debrid')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('install_torrentio_ad')
                        .setLabel('Install with AllDebrid')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('configure_torrentio')
                        .setLabel('Advanced Config')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setURL('https://real-debrid.com')
                        .setLabel('Get Real-Debrid')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({
                embeds: [embed],
                components: [row],
                files: [
                    './addonicons/torrentio.png'
                ],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in torrentio command:', error);
            await interaction.reply({
                content: '❌ An error occurred while fetching addon information. Please try again later.',
                ephemeral: true
            });
        }
    },

    async handleButton(interaction) {
        const buttonId = interaction.customId;

        if (buttonId === 'install_torrentio_rd') {
            // Create modal for Real-Debrid API key
            const modal = new ModalBuilder()
                .setCustomId('torrentio_rd_modal')
                .setTitle('Torrentio Real-Debrid Setup');

            const apiKeyInput = new TextInputBuilder()
                .setCustomId('rd_api_key')
                .setLabel('Enter your Real-Debrid API key')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Your API key')
                .setRequired(true);

            const firstActionRow = new ActionRowBuilder().addComponents(apiKeyInput);
            modal.addComponents(firstActionRow);

            await interaction.showModal(modal);
        }
        else if (buttonId === 'install_torrentio_ad') {
            // Create modal for AllDebrid API key
            const modal = new ModalBuilder()
                .setCustomId('torrentio_ad_modal')
                .setTitle('Torrentio AllDebrid Setup');

            const apiKeyInput = new TextInputBuilder()
                .setCustomId('ad_api_key')
                .setLabel('Enter your AllDebrid API key')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Your API key')
                .setRequired(true);

            const firstActionRow = new ActionRowBuilder().addComponents(apiKeyInput);
            modal.addComponents(firstActionRow);

            await interaction.showModal(modal);
        }
        else if (buttonId === 'configure_torrentio') {
            const configEmbed = new EmbedBuilder()
                .setColor('#ffff00')
                .setTitle('Advanced Torrentio Configuration')
                .setDescription('Configure advanced settings for Torrentio:')
                .addFields(
                    { name: 'Languages', value: 'Select your preferred languages' },
                    { name: 'Quality Filters', value: 'Choose quality preferences' },
                    { name: 'Debrid Options', value: 'Configure debrid-specific settings' }
                );

            const configRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('torrentio_language')
                        .setLabel('Language Settings')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('torrentio_quality')
                        .setLabel('Quality Settings')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('torrentio_debrid')
                        .setLabel('Debrid Settings')
                        .setStyle(ButtonStyle.Secondary)
                );

            await interaction.reply({
                embeds: [configEmbed],
                components: [configRow],
                ephemeral: true
            });
        }
    },

    async handleModal(interaction) {
        if (interaction.customId === 'torrentio_rd_modal') {
            const rdApiKey = interaction.fields.getTextInputValue('rd_api_key');
            const installUrl = `vidi://torrentio.strem.fun/providers=yts,eztv,rarbg,1337x,thepiratebay,kickasstorrents,torrentgalaxy,magnetdl,horriblesubs,nyaasi,tokyotosho,anidex,rutracker%7Cqualityfilter=brremux,hdrall,dolbyvision,dolbyvisionwithhdr,threed,other,scr,cam,unknown%7Climit=5%7Cdebridoptions=nodownloadlinks%7Crealdebrid=${rdApiKey}/manifest.json`;
            
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Torrentio with Real-Debrid')
                .setDescription(`Click [here](${installUrl}) to install Torrentio.\n\nMake sure you have Vidi installed on your device.`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
        else if (interaction.customId === 'torrentio_ad_modal') {
            const adApiKey = interaction.fields.getTextInputValue('ad_api_key');
            const installUrl = `vidi://torrentio.strem.fun/providers=yts,eztv,rarbg,1337x,thepiratebay,kickasstorrents,torrentgalaxy,magnetdl,horriblesubs,nyaasi,tokyotosho,anidex,rutracker%7Cqualityfilter=brremux,hdrall,dolbyvision,dolbyvisionwithhdr,threed,other,scr,cam,unknown%7Climit=5%7Cdebridoptions=nodownloadlinks%7Calldebrid=${adApiKey}/manifest.json`;
            
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Torrentio with AllDebrid')
                .setDescription(`Click [here](${installUrl}) to install Torrentio.\n\nMake sure you have Vidi installed on your device.`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
