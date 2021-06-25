module.exports = function(skill_name, cdg, page, max_pages){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('default.skillitems_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('default.skillitems_next')
    let back = new MessageButton()
        .setStyle('blurple')
        .setLabel(skill_name)
        .setID('default.skill')

    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    if(max_pages === page){
        next.setDisabled(true)
    }

    let components = [[back, previous, next]]
    return components
}
