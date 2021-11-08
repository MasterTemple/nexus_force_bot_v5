module.exports = {
    name: ['buy'],
    description: 'View how to buy an item or brick',
    use: 'buy [args]',
    example:['buy samurai sword 3'],
    notes: 'This is a command used to view how to buy an item or brick.',
    search_type: 'bricks_or_items',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}objects/${Math.floor(id/256)}/${id}.json`)
        embed.setTitle(`${data_file.itemInfo.name} [${id}]`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/buy')
        fields_function(embed, data_file, config)
        let components_function = require('./../../functions/components/buy')
        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }
        let components = components_function(page, message_data['max_pages'], data_file, module.exports.embed_length)

        return [, embed, components, message_data]
    }
}
