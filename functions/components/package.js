module.exports = function(page, max_pages){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('default.package_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('default.package_next')
    let percents = new MessageButton()
        .setStyle('green')
        .setLabel('Percents')
        .setID('default.package')
    let fractions = new MessageButton()
        .setStyle('blurple')
        .setLabel('Fractions')
        .setID('buttons.packagef')
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
