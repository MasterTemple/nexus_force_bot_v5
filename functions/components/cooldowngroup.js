module.exports = function(cdg, page, max_pages){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('default.cooldowngroup_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('default.cooldowngroup_next')
    let back = new MessageButton()
        .setStyle('green')
        .setLabel(`Cooldown Group: ${cdg}`)
        .setID('default.cooldowngroup')

    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    if(max_pages === page){
        next.setDisabled(true)
    }

    let components = [[back, previous, next]]
    return components
}
