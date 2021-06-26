module.exports = {
    name: ['preconditions', 'pre'],
    description: 'View the preconditions of an item',
    use: 'preconditions [args]',
    example:['preconditions samurai 3'],
    notes: 'This is a command used to view the preconditions of an item.',
    search_type: 'bricks_or_items',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}objects/${Math.floor(id/256)}/${id}.json`)

        embed.setTitle(`${data_file.itemInfo.name} [${id}] (${page+1})`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/preconditions')
        fields_function(embed, data_file, config)


        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }
        let components_function = require('./../../functions/components/preconditions')
        let components = components_function(data_file, config)

        return [, embed, components, message_data]
    }
}
