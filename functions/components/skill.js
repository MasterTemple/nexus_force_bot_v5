module.exports = function(skill_name, cdg, amount_of_items){
    let { MessageButton } = require('discord-buttons')
    let skill = new MessageButton()
        .setStyle('green')
        .setLabel(skill_name)
        .setID('default.skill')
    let cooldown_group = new MessageButton()
        .setStyle('blurple')
        .setLabel(`Cooldown Group: ${cdg}`)
        .setID('default.cooldowngroup')
    let skill_items= new MessageButton()
        .setStyle('blurple')
        .setLabel('Skill Items')
        .setID('default.skillitems')


    if(amount_of_items === 0){
        skill_items.setDisabled(true)
    }

    let components = [[skill, skill_items, cooldown_group]]
    return components
}
