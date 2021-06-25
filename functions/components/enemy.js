module.exports = function(){
    let { MessageButton } = require('discord-buttons')

    let stats = new MessageButton()
        .setStyle('green')
        .setLabel('Stats')
        .setID('default.enemy')
    let drops = new MessageButton()
        .setStyle('blurple')
        .setLabel('Drops')
        .setID('default.enemydrop')

    
    let components = [[stats, drops]]
    return components
}
