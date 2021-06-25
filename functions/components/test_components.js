module.exports = function(page){
    let { MessageButton } = require('discord-buttons')
    let click_button = new MessageButton()
        .setStyle('blurple')
        .setLabel('Click Me!')
        .setID('buttons.test_comps')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('buttons.test_comps_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('buttons.test_comps_next')
    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    let components = [[click_button],[previous, next]]
    return components
}
