module.exports = {
    name: ['skill'],
    description: 'View skill stats',
    use: 'skill [args]',
    example:['skill samurai 3'],
    notes: 'This is a command used to view the stats of a skill.',
    search_type: 'skills',
    embed_length: 24,
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


        embed.setTitle(`${this_skill.name} [${id}]`)
        embed.setThumbnail(config['image_link_domain']+this_skill['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}objects/${id}`)

        let fields_function = require('./../../functions/fields/skill')
        fields_function(embed, config, skillToCDGFile, skillData, id)
        let components_function = require('./../../functions/components/skill')
        let components = components_function(this_skill.name, this_skill.cdg, Object.keys(skillData.items).length)

        return [, embed, components, message_data]
    }
}
