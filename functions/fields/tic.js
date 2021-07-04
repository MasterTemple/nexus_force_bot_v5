module.exports = function(embed, config, message_data, client){
    switch(message_data['stage']){
        case 'initialize': {
            embed.addField("Challenger", `<@${message_data.challenger.id}> ${client.emojis.cache.get(config.emojis[message_data.challenger.faction])}`, true)
            embed.addField(config.invis_char, ` **vs**`, true)
            embed.addField("Challenged", `<@${message_data.challenged.id}> ${client.emojis.cache.get(config.emojis[message_data.challenged.faction])}`, true)
            break
        }
        case 'reject':{
            embed.addField("Challenger", `<@${message_data.challenger.id}> ${client.emojis.cache.get(config.emojis[message_data.challenger.faction])}`, true)
            embed.addField(config.invis_char, ` **vs**`, true)
            embed.addField("Challenged", `<@${message_data.challenged.id}> ${client.emojis.cache.get(config.emojis[message_data.challenged.faction])}`, true)

            embed.addField("Challenge Rejected ❌", `<@${message_data.challenged.id}> has rejected <@${message_data.challenger.id}>'s challenge`, false)
            break
        }
        case 'accept':{
            embed.addField("Challenger", `<@${message_data.challenger.id}> ${client.emojis.cache.get(config.emojis[message_data.challenger.faction])}`, true)
            embed.addField(config.invis_char, ` **vs**`, true)
            embed.addField("Challenged", `<@${message_data.challenged.id}> ${client.emojis.cache.get(config.emojis[message_data.challenged.faction])}`, true)

            embed.addField("Challenge Accept ✅", `<@${message_data.challenged.id}> has accepted <@${message_data.challenger.id}>'s challenge`, false)
            embed.addField("Choose Your Faction!", config.invis_char, false)
            break
        }
        case 'choose_faction':{
            embed.addField("Challenger", `<@${message_data.challenger.id}> ${client.emojis.cache.get(config.emojis[message_data.challenger.faction])}`, true)
            embed.addField(config.invis_char, ` **vs**`, true)
            embed.addField("Challenged", `<@${message_data.challenged.id}> ${client.emojis.cache.get(config.emojis[message_data.challenged.faction])}`, true)

            embed.addField("Challenge Accept ✅", `<@${message_data.challenged.id}> has accepted <@${message_data.challenger.id}>'s challenge`, false)
            embed.addField("Choose Your Faction!", config.invis_char, false)
            break
        }
        case 'play': {
            embed.addField("Challenger", `<@${message_data.challenger.id}> ${client.emojis.cache.get(config.emojis[message_data.challenger.faction])}`, true)
            embed.addField(config.invis_char, ` **vs**`, true)
            embed.addField("Challenged", `<@${message_data.challenged.id}> ${client.emojis.cache.get(config.emojis[message_data.challenged.faction])}`, true)
            if(message_data['required_users'][0] === message_data.challenged.id){
                
                embed.addField("Turn:", `<@${message_data.challenged.id}> ${client.emojis.cache.get(config.emojis[message_data.challenged.faction])}`, false)
            }
            else{
                embed.addField("Turn:", `<@${message_data.challenger.id}> ${client.emojis.cache.get(config.emojis[message_data.challenger.faction])}`, false)
            }
            // embed.addField("Challenge Accept ✅", `<@${message_data.challenged.id}> has accepted <@${message_data.challenger.id}>'s challenge`, false)
            break
        }
        case 'game_over':{
            embed.addField("Challenger", `<@${message_data.challenger.id}> ${client.emojis.cache.get(config.emojis[message_data.challenger.faction])}`, true)
            embed.addField(config.invis_char, ` **vs**`, true)
            embed.addField("Challenged", `<@${message_data.challenged.id}> ${client.emojis.cache.get(config.emojis[message_data.challenged.faction])}`, true)
            if(message_data?.winner?.id) {
                embed.addField(`${client.emojis.cache.get(config.emojis[message_data.winner.faction])} Winner! ${client.emojis.cache.get(config.emojis[message_data.winner.faction])}`, `<@${message_data.winner.id}> ${client.emojis.cache.get(config.emojis[message_data.winner.faction])} beat <@${message_data.loser.id}> ${client.emojis.cache.get(config.emojis[message_data.loser.faction])} in a game of Tic Tac Toe!`, false)
            }else{
                embed.addField(`${client.emojis.cache.get(config.emojis[message_data.challenger.faction])} Draw! ${client.emojis.cache.get(config.emojis[message_data.challenged.faction])}`, `<@${message_data.challenger.id}> ${client.emojis.cache.get(config.emojis[message_data.challenger.faction])} tied to <@${message_data.challenged.id}> ${client.emojis.cache.get(config.emojis[message_data.challenged.faction])} in a game of Tic Tac Toe!`, false)

            }
        }
    }
}
