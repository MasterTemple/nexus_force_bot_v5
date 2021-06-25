module.exports = function(page, max_pages){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('default.enemydrop_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('default.enemydrop_next')
    let percents = new MessageButton()
        .setStyle('green')
        .setLabel('Percents')
        .setID('default.enemydrop')
    let fractions = new MessageButton()
        .setStyle('blurple')
        .setLabel('Fractions')
        .setID('buttons.enemydropf')
    let stats = new MessageButton()
        .setStyle('blurple')
        .setLabel('Stats')
        .setID('default.enemy')


    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    if(max_pages === page){
        next.setDisabled(true)
    }

    let components = [[previous, next, percents, fractions, stats]]
    return components
}
