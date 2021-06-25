module.exports = function(config, embed_title, embed_title_url, embed_thumbnail_url){
    const Discord = require('discord.js');

    if(!embed_title_url.includes('http')){
        embed_title_url = config.explorer_link_domain + embed_title_url
    }
    if(!embed_thumbnail_url.includes('http')){
        embed_thumbnail_url = config.image_link_domain + embed_thumbnail_url
    }

    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(embed_title)
        .setURL(embed_title_url)
        .setAuthor(config.name, config.bot_icon_url, embed_title_url)
        .setThumbnail(embed_thumbnail_url)
        .setTimestamp()
        .setFooter(config.footer, config.bot_icon_url);


    return embed

}