module.exports = {
    name: ['factions'],
    description: 'View what a vendor sells',
    use: 'npc [args]',
    example: ['npc samurai 3'],
    notes: 'This is a command used to view what a vendor sells.',
    search_type: 'npcs',
    embed_length: 18,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {

        delete embed.url
        let roles = [
            {
                name: "Assembly",
                id: "341260781037289473",
                emoji: "850419548611280986",
                size: 0
            },
            {
                name: "Paradox",
                id: "341260681791799317",
                emoji: "850419548271149097",
                size: 0
            },
            {
                name: "Sentinels",
                id: "341260934221660170",
                emoji: "850419548653092905",
                size: 0
            },
            {
                name: "Venture League",
                id: "341260852823064589",
                emoji: "850419548733440031",
                size: 0
            }
            // {
            //     name: "Assembly",
            //     id: "874421802712072212",
            //     emoji: "850419548611280986",
            //     size: 0
            // },
            // {
            //     name: "Paradox",
            //     id: "874421753106022410",
            //     emoji: "850419548271149097",
            //     size: 0
            // },
            // {
            //     name: "Sentinels",
            //     id: "872737127899758602",
            //     emoji: "850419548653092905",
            //     size: 0
            // },
            // {
            //     name: "Venture League",
            //     id: "874421838854365214",
            //     emoji: "850419548733440031",
            //     size: 0
            // }
        ]
        let members = await message.guild.members.fetch()
        // console.log(members)
        for(let [id, each_member] of members) {
            // console.log(each_member)
            for (let faction_role of roles) {
                if(each_member._roles.includes(faction_role.id)){
                    faction_role.size++
                }
            }
        }
        // for (let faction_role of roles) {
        //     let role_size = await message.guild.roles.fetch(faction_role.id, {limit: 1000})
        //     // faction_role.size = parseInt(faction_role.emoji[faction_role.emoji.length-1])
        //     faction_role.size = message.guild.roles.fetch(faction_role.id).members.size
        // }
        roles.sort(function(a, b) {
            return b.size - a.size
        })
        // console.log(roles)
        let desc = ""
        let total_members = 0
        roles.forEach( (r, c) => {
            total_members = total_members + r.size
            desc = `${desc}**${c+1}.** ${message.client.emojis.cache.get(r.emoji)} ${r.name} ${message.client.emojis.cache.get(r.emoji)} - ${r.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} members\n`
            // desc = `${desc}**${c+1}.** ${message.client.emojis.cache.get(r.emoji)} ${r.name} - ${r.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} members ${message.client.emojis.cache.get(r.emoji)}\n`
        })

        // let role_name = "sentinels"
        // let role_id = '872737127899758602'
        // console.log(role.data)
        // let number_of_members = role.members.size
        // embed.setTitle(`${message.client.emojis.cache.get(config.emojis.nexus_force)} Nexus Force ${message.client.emojis.cache.get(config.emojis.nexus_force)} - ${total_members} members`)
        embed.setTitle(`Nexus Force - ${total_members} members`)
        embed.setDescription(desc)
        delete embed.thumbnail
        // embed.setImage("https://static.wikia.nocookie.net/legouniverse/images/7/76/Nexus_force.png/revision/latest?cb=20110207175332")

        return [, embed, , message_data]
    }
}