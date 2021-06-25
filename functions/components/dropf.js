module.exports = function(page, max_pages){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('buttons.dropf_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('buttons.dropf_next')
    let percents = new MessageButton()
        .setStyle('blurple')
        .setLabel('Percents')
        .setID('default.drop')
    let fractions = new MessageButton()
        .setStyle('green')
        .setLabel('Fractions')
        .setID('buttons.dropf')
    let back = new MessageButton()
        .setStyle('blurple')
        .setLabel('Back')
        .setID('default.item')

    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    if(max_pages === page){
        next.setDisabled(true)
    }

    let components = [[previous, next, percents, fractions, back]]
    return components
}
