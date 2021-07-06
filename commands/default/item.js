module.exports = {
    name: ['item', 'item'],
    description: 'View item stats',
    use: 'item [args]',
    example:['item samurai 3'],
    notes: 'This is a command used to view an item.',
    search_type: 'bricks_or_items',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}objects/${Math.floor(id/256)}/${id}.json`)

        embed.setTitle(`${data_file.itemInfo.name} [${id}]`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/item')
        fields_function(embed, data_file, config, message.client)
        let components_function = require('./../../functions/components/item')
        let components = components_function(data_file, config)
        // console.log(`\n${JSON.stringify(embed, null, 2)}\n`)

        return [, embed, components, message_data]
    }
}
