module.exports = function(data_file, config){
    let { MessageButton } = require('discord-buttons')
    let drop = new MessageButton()
        .setStyle('blurple')
        .setLabel('Drop')
        .setID('default.drop')
    let buy = new MessageButton()
        .setStyle('blurple')
        .setLabel('Buy')
        .setID('default.buy')


    if(data_file.buyAndDrop.Vendors.length === 0){
        buy.setDisabled(true)
    }
    // if(Object.keys(data_file.earn).length === 0){
    //     earn.setDisabled(true)
    // }
    if(data_file.buyAndDrop.EnemyIDs.length === 0){
        drop.setDisabled(true)
    }
    let components = [[drop, buy]]
    return components
}
