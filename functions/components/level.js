module.exports = function(level){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel(`Level ${level-1}`)
        .setID('default.level_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel(`Level ${parseInt(level)+1}`)
        .setID('default.level_next')

    if(parseInt(level) === 1){
        previous.setDisabled(true)
    }
    if(parseInt(level) === 85){
        next.setDisabled(true)
    }

    let components = [[previous, next]]
    return components
}
