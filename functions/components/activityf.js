module.exports = function(page, max_pages){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('buttons.activityf_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('buttons.activityf_next')
    let percents = new MessageButton()
        .setStyle('blurple')
        .setLabel('Percents')
        .setID('default.activity')
    let fractions = new MessageButton()
        .setStyle('green')
        .setLabel('Fractions')
        .setID('buttons.activityf')

    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    if(max_pages === page){
        next.setDisabled(true)
    }

    let components = [[previous, next, percents, fractions]]
    return components
}
