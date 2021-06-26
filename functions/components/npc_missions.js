module.exports = function(page, max_pages, data_file){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('default.npcmissions_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('default.npcmissions_next')
    let npc_vendor = new MessageButton()
        .setStyle('blurple')
        .setLabel('Vendor')
        .setID('default.npcvendor')
    let npc_missions = new MessageButton()
        .setStyle('green')
        .setLabel('Missions')
        .setID('default.npcmissions')
    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    if(max_pages === page){
        next.setDisabled(true)
    }
    if(data_file.isVendor !== 1){
        npc_vendor.setDisabled(true)
    }
    let components = [[npc_missions, npc_vendor, previous, next]]
    return components
}
