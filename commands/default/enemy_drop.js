module.exports = {
    name: ['enemydrop', 'ed'],
    description: 'View what an enemydrop drops',
    use: 'enemydrop [args]',
    example:['enemydrop samurai 3'],
    notes: 'This is a command used to view what an enemydrop drops.',
    search_type: 'enemies',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}enemies/${id}.json`)


        embed.setTitle(`${data_file.itemInfo.displayName} [${id}] (${page+1})`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/enemydrop')
        fields_function(embed, data_file, config)
        let components_function = require('./../../functions/components/enemydrop')
        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }
        let components = components_function(page, message_data['max_pages'])
        return [, embed, components, message_data]
    }
}
