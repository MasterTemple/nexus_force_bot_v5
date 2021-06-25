module.exports = function(data_file, config){
    let { MessageButton } = require('discord-buttons')
    let preconditions = new MessageButton()
        .setStyle('blurple')
        .setLabel('Preconditions')
        .setID('default.preconditions')
    let package = new MessageButton()
        .setStyle('blurple')
        .setLabel('Package')
        .setID('default.package')
    let back = new MessageButton()
        .setStyle('blurple')
        .setLabel('Back')
        .setID('default.item')

    let item_is_not_package = true
    let item_has_no_preconditions = true
    if(Object.keys(data_file.components).includes('53')){
        item_is_not_package = false
    }
    if(data_file.itemComponent.preconditions !== null){
        item_has_no_preconditions = false
    }
    if(item_is_not_package){
        package.setDisabled(true)
    }
    if(item_has_no_preconditions || data_file['itemInfo']['type'] === "LEGO brick"){
        preconditions.setDisabled(true)
    }

    let components = [[preconditions, package, back]]
    return components
}
