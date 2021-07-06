module.exports = {
    name: ['simulate'],
    description: 'Simulate a drop from an enemy, package, or activity',
    use: 'simulate [args]',
    example:['simulate samurai 3'],
    notes: 'This is a command used to simulate a drop from an enemy, package, or activity.',
    search_type: 'bricks_or_items',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let item_args
        let enemy_package_or_activity_args
        try {
            [item_args, enemy_package_or_activity_args] = message.content.match(/(?<=\!\w+ ).*/g)[0].toLowerCase().split(' from ')
        }catch{
            item_args = id
            // console.log(message_data)
            enemy_package_or_activity_args = message_data['button_id'].match(/(?<=\[)[^\]]*(?=])/g)?.[0]
            // console.log(enemy_package_or_activity_args)
            // enemy_package_or_activity_args = message?.['components']?.[0]?.['components']?.[0]?.custom_id.match(/(?<=\[)[^\]]*(?=])/g)?.[0]
        }

        // console.log(item_args, enemy_package_or_activity_args)
        let search = require('./../../functions/search')
        let item_id = search('objects', true, item_args.split(/ +/g))
        let item_file = require(`${config['output_path']}objects/${Math.floor(item_id/256)}/${item_id}.json`)


        embed.setTitle(`${item_file.itemInfo.displayName} [${item_id}]`)
        embed.setThumbnail(config['image_link_domain']+item_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/simulate')
        let name = fields_function(embed, item_file, config, search, enemy_package_or_activity_args)


        let components_function = require('./../../functions/components/simulate')
        let components = components_function(name)

        return [, embed, components, message_data]
    }
}
