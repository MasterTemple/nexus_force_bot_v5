module.exports = function(page, max_pages){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('default.earn_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('default.earn_next')
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

    let components = [[previous, next, back]]
    return components
}
