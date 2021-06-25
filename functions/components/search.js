module.exports = function(page, max_pages){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('default.search_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('default.search_next')
    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    if(max_pages === page){
        next.setDisabled(true)
    }
    let components = [[previous, next]]
    return components
}
