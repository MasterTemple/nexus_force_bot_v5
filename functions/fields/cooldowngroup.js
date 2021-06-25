module.exports = function(embed, config, cdg_skills, skills_file, id) {
    Object.keys(cdg_skills).forEach((each_skill_id) => {
        if(skills_file[each_skill_id].name && skills_file[each_skill_id].Description) {
            embed.addField(skills_file[each_skill_id].name, `${skills_file[each_skill_id].Description} [[${each_skill_id}]](${config.explorer_link_domain}skills/${each_skill_id})`)
        }
        else if(skills_file[each_skill_id].name){
            embed.addField(skills_file[each_skill_id].name, `No Description. [[${each_skill_id}]](${config.explorer_link_domain}skills/${each_skill_id})`)

        }else{
            embed.addField(`Skill ID: ${each_skill_id}`, `No Description. [[${each_skill_id}]](${config.explorer_link_domain}skills/${each_skill_id})`)
        }
    })

}