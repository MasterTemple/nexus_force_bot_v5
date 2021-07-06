module.exports = {
    name: ['search'],
    description: 'Search for Objects',
    use: 'search [args]',
    example:['search samurai 3'],
    notes: 'This is a command used to view all results for a given query.',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {

        let search = require('./../../functions/search')
        let results = search('objects_with_render_comp', false, args)
        embed.setTitle(`Searching for: "${args.join(' ')}" (${page+1})`)
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

        let components = components_function(page, message_data['max_pages'], results)

        return [, embed, components, message_data]
    }
}
