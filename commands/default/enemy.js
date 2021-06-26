module.exports = {
    name: ['enemy'],
    description: 'View enemy stats',
    use: 'enemy [args]',
    example:['enemy ape'],
    notes: 'This is a command used to view an enemy\'s stats.',
    search_type: 'enemies',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}enemies/${id}.json`)
        embed.setTitle(`${data_file.itemInfo.name} [${id}]`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/enemy')
        fields_function(embed, data_file, config)
        let components_function = require('./../../functions/components/enemy')
        let components = components_function(data_file, config)

        return [, embed, components, message_data]
    }
}
