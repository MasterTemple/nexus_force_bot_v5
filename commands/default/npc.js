module.exports = {
    name: ['npc', 'npcmissions'],
    description: 'View an npc\'s missions',
    use: 'npc [args]',
    example:['npc samurai 3'],
    notes: 'This is a command used to view an npc.',
    search_type: 'npcs',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}npcs/${Math.floor(id/256)}/${id}.json`)

        embed.setTitle(`${data_file.itemInfo.name} [${id}] (${page+1})`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        // console.log(JSON.stringify(data_file, null, 2))

        let fields_function = require('./../../functions/fields/npc_missions')
        fields_function(embed, data_file, config)
        let is_not_mission_giver = true
        if(embed.fields.length === 0) {
            is_not_mission_giver = false
            embed.addField("No Missions!", "This NPC has no missions!", false)
        }
        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }

        let components_function = require('./../../functions/components/npc_missions')
        let components = components_function(page, message_data['max_pages'], data_file, module.exports.embed_length, is_not_mission_giver)

        return [, embed, components, message_data]
    }
}
