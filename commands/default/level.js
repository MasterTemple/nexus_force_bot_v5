module.exports = {
    name: ['level'],
    description: 'Level information',
    use: 'level [args]',
    example:['level samurai 3'],
    notes: 'This is a command used to view level experience requirements.',
    search_type: 'objects',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {

        let level = args?.[0]
        if(level === undefined){
            level = embed.title.match(/\d+(?=!)/g)[0]
        }
        // console.log(level, page)
        level = parseInt(level) + parseInt(page)
        let data_file = require('./../../output/single_file_data/levels.json')

        embed.setTitle(`Level ${level}!`)
        embed.setThumbnail(config.universe_icon)
        embed.setURL(`${config['explorer_link_domain']}dashboard`)

        let fields_function = require('./../../functions/fields/level')
        fields_function(embed, data_file, config, level)


        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }
        let components_function = require('./../../functions/components/level')
        let components = components_function(level)

        return [, embed, components, message_data]
    }
}