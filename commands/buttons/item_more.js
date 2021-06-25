module.exports = {
    name: ['item_more'],
    description: 'More button on item embed',
    use: 'item_more',
    example:['item_more'],
    notes: 'This changes the buttons on the item embed',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {

        let data_file = require(`${config['output_path']}objects/${Math.floor(id/256)}/${id}.json`)
        let fields_function = require('./../../functions/fields/item')
        fields_function(embed, data_file, config)
        let components_function = require('./../../functions/components/item_more')
        let components = components_function(data_file, config)

        return [, embed, components, message_data]
    }
}
