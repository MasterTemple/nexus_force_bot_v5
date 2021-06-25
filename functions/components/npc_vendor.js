module.exports = function(page, max_pages){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('default.vendor_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('default.vendor_next')
    let npc_vendor = new MessageButton()
        .setStyle('green')
        .setLabel('Vendor')
        .setID('default.vendor')
    let npc_missions = new MessageButton()
        .setStyle('blurple')
        .setLabel('Missions')
        .setID('default.npcmissions')
    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    if(max_pages === page){
        next.setDisabled(true)
    }
    let components = [[npc_missions, npc_vendor, previous, next]]
    return components
}
