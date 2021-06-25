module.exports = {
    name: ['kit', 'kits'],
    description: 'Item Set',
    use: 'kit [args]',
    example:['kit samurai 3'],
    notes: 'This is a command used to view all the bonuses of an item set.',
    search_type: 'kits',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}kitData/${id}.json`)

        embed.setTitle(data_file.name)
        embed.setThumbnail(data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/item-sets/${id}`)

        let fields_function = require('./../../functions/fields/kits')
        fields_function(embed, data_file, config)

        return [, embed, , ]
    }
}
