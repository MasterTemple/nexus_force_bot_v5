module.exports = {
    name: ['package'],
    description: 'View what an package drops',
    use: 'package [args]',
    example:['package samurai 3'],
    notes: 'This is a command used to view what an package drops.',
    search_type: 'packages',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        // let id = returned_id[1]

        let data_file = require(`${config['output_path']}packages/${id}.json`)
        let package_name = data_file.itemInfo.displayName

        embed.setTitle(`${package_name} [${id}] (${page+1})`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/package')
        fields_function(embed, data_file, config)
        let components_function = require('./../../functions/components/package')
        
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
