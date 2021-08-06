module.exports = {
    name: ['mission', 'achievement'],
    description: 'View a mission\'s information',
    use: 'mission [args]',
    example:['mission samurai 3'],
    notes: 'This is a command used to view a mission or an achievement.',
    search_type: 'missions',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = require(`${config['output_path']}missions/${id}.json`)

        embed.setTitle(`${data_file.MissionStats.MissionText.name} [${id}]`)
        //it should be this but i need to update it (with image_link_domain
        //        embed.setThumbnail(config['image_link_domain']+data_file['MissionTasks']['iconURL'])
        embed.setThumbnail(data_file['MissionTasks']['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}missions/${id}`)

        let fields_function = require('./../../functions/fields/mission')
        fields_function(embed, data_file, config)
        let components_function = require('./../../functions/components/mission')
        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }
        let components = components_function(page, message_data['max_pages'], data_file.MissionStats.rewards, module.exports.embed_length)

        return [, embed, components, message_data]
    }
}
