module.exports = {
    name: ['brick', 'bricks'],
    description: 'View brick information',
    use: 'brick [args]',
    example:['brick tail fin 2x3x2'],
    notes: 'This is a command used to view a brick.',
    search_type: 'bricks',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}objects/${Math.floor(id/256)}/${id}.json`)

        embed.setTitle(`${data_file.itemInfo.name} [${id}]`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/item')
        fields_function(embed, data_file, config)
        let components_function = require('./../../functions/components/item')
        let components = components_function(data_file)

        return [, embed, components, message_data]
    }
}
