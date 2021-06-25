module.exports = function(page, max_pages, tier, lti_file){
    let { MessageButton } = require('discord-buttons')
    let previous = new MessageButton()
        .setStyle('blurple')
        .setLabel('Previous')
        .setID('default.loottable_previous')
    let next = new MessageButton()
        .setStyle('blurple')
        .setLabel('Next')
        .setID('default.loottable_next')
    let tier1 = new MessageButton()
        .setStyle('blurple')
        .setLabel('Tier 1')
        .setID('default.loottable_1')
    let tier2 = new MessageButton()
        .setStyle('blurple')
        .setLabel('Tier 2')
        .setID('default.loottable_2')
    let tier3 = new MessageButton()
        .setStyle('blurple')
        .setLabel('Tier 3')
        .setID('default.loottable_3')
    let tier4 = new MessageButton()
        .setStyle('blurple')
        .setLabel('Tier 4')
        .setID('default.loottable_4')

    if(parseInt(page) === 0){
        previous.setDisabled(true)
    }
    if(max_pages === page){
        next.setDisabled(true)
    }

    if(tier === 1){
        tier1.setStyle('green')
    }else if(tier === 2){
        tier2.setStyle('green')
    }else if(tier === 3){
        tier3.setStyle('green')
    }else if(tier === 4){
        tier4.setStyle('green')
    }
    for(let i = 1; i <=4;i++) {
        if (lti_file.byRarity[i].length === 0) {
            eval(`tier${i}`).setDisabled(true)
        }
    }

    let components = [[tier1, tier2, tier3, tier4], [previous, next]]
    return components
}