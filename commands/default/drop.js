module.exports = {
    name: ['drop'],
    description: 'View what drops an item',
    use: 'drop [args]',
    example:['drop red parrot'],
    notes: 'This is a command used to view what drops an item.',
    search_type: 'bricks_or_items',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}objects/${Math.floor(id/256)}/${id}.json`)

        embed.setTitle(`${data_file.itemInfo.name} [${id}] (${page+1})`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/drop')
        fields_function(embed, data_file, config, message_data)
        let components_function = require('./../../functions/components/drop')
        // let components = components_function(data_file, config)
        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }
        let components = components_function(page, message_data['max_pages'])
        // console.log(page, message_data)

        return [, embed, components, message_data]
    }
}
