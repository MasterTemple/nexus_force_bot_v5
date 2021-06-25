module.exports = {
    name: ['vendor', 'npcvendor'],
    description: 'View npc stats',
    use: 'npc [args]',
    example:['npc samurai 3'],
    notes: 'This is a command used to view an npc.',
    search_type: 'npcs',
    embed_length: 18,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}npcs/${Math.floor(id/256)}/${id}.json`)

        embed.setTitle(`${data_file.itemInfo.name} [${id}] (${page+1})`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        // console.log(JSON.stringify(data_file, null, 2))

        let fields_function = require('./../../functions/fields/npc_vendor')
        fields_function(embed, data_file, config)

        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }

        let components_function = require('./../../functions/components/npc_vendor')
        let components = components_function(page, message_data['max_pages'])

        return [, embed, components, message_data]
    }
}
