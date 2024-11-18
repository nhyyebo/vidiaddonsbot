const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Quick setup for Torrentio addon'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Torrentio Quick Setup')
            .setDescription('Install Torrentio with pre-configured settings for optimal performance.')
            .addFields(
                { name: 'Included Providers', value: 'YTS, EZTV, RARBG, 1337x, ThePirateBay, KickassTorrents, TorrentGalaxy, MagnetDL, HorribleSubs, NyaaSi, TokyoTosho, AniDex, RuTracker' },
                { name: 'Quality Filters', value: 'BRRip/Remux, HDR, Dolby Vision, 3D' },
                { name: 'Other Settings', value: '• 5 links per stream\n• No download links\n• Real-Debrid integration' }
            )
            .setFooter({ text: 'Vidi Addons' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('setup_install')
                    .setLabel('Install Torrentio')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setURL('https://real-debrid.com')
                    .setLabel('Get Real-Debrid')
                    .setStyle(ButtonStyle.Link)
            );

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    },

    async handleButton(interaction) {
        if (interaction.customId === 'setup_install') {
            const installUrl = 'vidi://torrentio.strem.fun/providers=yts,eztv,rarbg,1337x,thepiratebay,kickasstorrents,torrentgalaxy,magnetdl,horriblesubs,nyaasi,tokyotosho,anidex,rutracker%7Cqualityfilter=brremux,hdrall,dolbyvision,dolbyvisionwithhdr,threed,other,scr,cam,unknown%7Climit=5%7Cdebridoptions=nodownloadlinks%7Crealdebrid=API Token/manifest.json';
            
            const installEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Install Torrentio')
                .setDescription(`Click [here](${installUrl}) to install Torrentio with optimal settings.\n\nMake sure you have:\n1. Vidi installed on your device\n2. A Real-Debrid subscription\n3. Your Real-Debrid API token ready`);

            await interaction.reply({
                embeds: [installEmbed],
                ephemeral: true
            });
        }
    }
};
