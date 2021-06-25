module.exports = {
    name: ['search_previous'],
    description: 'Item Set',
    use: 'search [args]',
    example:['search samurai 3'],
    notes: 'This is a command used to view all results for a given query.',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        page--
        let search = require('./../../functions/search')
        args = embed.title.match(/(?<=").*(?=")/g)[0].split(/ +/g)
        let results = search('objects', false, args)
        embed.setTitle(embed.title.replace(/\(\d\)/g, `(${page+1})`))
        results.forEach((each_result, c) => {
            embed.addField(`${c+1}. ${each_result.name}`, `${each_result.type}: [[${each_result.id}]](${config.explorer_link_domain}objects/${each_result.id})`, true)
        })
        let components_function = require('./../../functions/components/search')
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
