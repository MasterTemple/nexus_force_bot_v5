module.exports = {
    name: ['loottable', 'lti'],
    description: 'View how to loot_table an item',
    use: 'loot_table [args]',
    example:['loot_table samurai 3'],
    notes: 'This is a command used to view how to loot_table an item.',
    search_type: 'lti_names',
    embed_length: 18,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let tier

        if(message_data['tier']){
            tier = message_data['tier']
        }else{
            tier = 1
        }

        let data_file = require(`${config['output_path']}lootTableIndexes/${id}.json`)

        while(data_file.byRarity[tier].length == 0){
            tier++
        }

        let lti_name
        try{
            lti_name = data_file.nameInfo.Name
        }catch{
            lti_name = data_file.nameInfo.AlternateName
        }
        embed.setTitle(`${data_file.nameInfo.Type}: ${lti_name} [${id}] Tier ${tier} (${page+1})`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/loot/table/${id}`)

        let fields_function = require('./../../functions/fields/loot_table')
        fields_function(embed, data_file, config, tier)

        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }

        let components_function = require('./../../functions/components/loot_table')
        let components = components_function(page, message_data['max_pages'], tier, data_file)

        message_data['tier'] = tier

        return [, embed, components, message_data]
    }
}
