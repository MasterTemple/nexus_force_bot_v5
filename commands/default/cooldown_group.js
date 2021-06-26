module.exports = {
    name: ['cooldowngroup', 'cdg'],
    description: 'View skills cooldowngroup\'s skills',
    use: 'cooldowngroup [cooldown group id]',
    example:['cooldowngroup 21'],
    notes: 'This is a command used to view all skills in a cooldown group.',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        // let cooldowngroupData = require(`${config['output_path']}objects/${Math.floor(id/256)}/${id}.json`)
        // let id = id

        let cdg
        try{
            cdg = args[0]
        }catch{
            try {
                cdg = message['components'][0]['components'].find((each_component) => {
                    if(each_component.label.includes("Cooldown Group: ")){
                        return each_component
                    }
                }).label.match(/\d+/g)[0]
            }catch{
                cdg = id
            }
        }
        // console.log(cdg)
        // console.log(args, cdg, id)
        let cdg_file = require(`${config['output_path']}cooldowngroup/${cdg}.json`)
        // console.log(JSON.stringify(cdg_file, null, 2))
        let skills_file = require(`./../../output/references/skills.json`)



        embed.setTitle(`Cooldown Group [${cdg}] (${page+1})`)
        embed.setThumbnail(config['universe_icon'])
        embed.setURL(`${config['explorer_link_domain']}dashboard`)

        let fields_function = require('./../../functions/fields/cooldowngroup')
        // console.log(cdg_file)
        fields_function(embed, config, cdg_file.skillIDs, skills_file, id)

        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }

        let components_function = require('./../../functions/components/cooldowngroup')

        let components = components_function(cdg, page, message_data['max_pages'])

        return [, embed, components, message_data]
    }
}
