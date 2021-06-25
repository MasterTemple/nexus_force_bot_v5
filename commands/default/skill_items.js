module.exports = {
    name: ['skillitems', 'skillitem'],
    description: 'View skill stats',
    use: 'skill [args]',
    example:['skill samurai 3'],
    notes: 'This is a command used to view an skill.',
    search_type: 'skills',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        // let skillData = require(`${config['output_path']}objects/${Math.floor(id/256)}/${id}.json`)
        // let id = id
        let skillToCDGFile = require(`./../../output/references/skills.json`)
        let skillName
        let this_skill = skillToCDGFile[id]
        try{
            skillName = this_skill['name']
        }catch{
            skillName = `SkillID`
        }
        let cooldowngroup = this_skill['cdg']
        let CDGFile = require(`${config['output_path']}cooldowngroup/${cooldowngroup}.json`)
        var skillData = CDGFile['skillIDs'][id]

        delete embed.description
        embed.setTitle(`${this_skill.name} [${id}] (${page+1})`)
        embed.setThumbnail(config['image_link_domain']+this_skill['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/skill_items')
        fields_function(embed, config, skillData.items, id)

        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }

        let components_function = require('./../../functions/components/skill_items')
        let components = components_function(this_skill.name, this_skill.cdg, page, message_data['max_pages'])



        return [, embed, components, message_data]
    }
}
