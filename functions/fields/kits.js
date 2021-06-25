module.exports = function(embed, info_file, config) {

    //this will only be 1 page cause its a short command, but i might need more fields later if i try to add the option to see all items

    let fields = []

    Object.keys(info_file['skillSetDescriptions']).forEach(function(skillSetBonus) {
        embed.addFields({
            name: `${skillSetBonus.charAt(skillSetBonus.length-1)} Piece Bonus`,
            value: info_file['skillSetDescriptions'][skillSetBonus],
            inline: false
        })
    })

    let with_valiant_length = Object.keys(info_file['totalWithValiant']).length
    let without_valiant_length = Object.keys(info_file['totalWithoutValiant']).length

    if(with_valiant_length > 0 && without_valiant_length > 0){
        embed.addFields({
            name: config.invis_char,
            value: '**Total Without Valiant**',
            inline: false
        })
        embed.addFields(
            {name: `${config.emojis.armor} Armor`, value: info_file['totalWithoutValiant']['armorBonusUI'], inline: true},
            {name: `${config.emojis.heart} Health`, value: info_file['totalWithoutValiant']['lifeBonusUI'], inline: true},
            {name: `${config.emojis.imagination} Imagination`, value: info_file['totalWithoutValiant']['imBonusUI'], inline: true},
        )

        embed.addFields({
            name: config.invis_char,
            value: '**Total With Valiant**',
            inline: false
        })
        embed.addFields(
            {name: `${config.emojis.armor} Armor`, value: info_file['totalWithValiant']['armorBonusUI'], inline: true},
            {name: `${config.emojis.heart} Health`, value: info_file['totalWithValiant']['lifeBonusUI'], inline: true},
            {name: `${config.emojis.imagination} Imagination`, value: info_file['totalWithValiant']['imBonusUI'], inline: true},
        )
    }
    else if(without_valiant_length > 0){
        embed.addFields(
            {name: `${config.emojis.armor} Armor`, value: info_file['totalWithoutValiant']['armorBonusUI'], inline: true},
            {name: `${config.emojis.heart} Health`, value: info_file['totalWithoutValiant']['lifeBonusUI'], inline: true},
            {name: `${config.emojis.imagination} Imagination`, value: info_file['totalWithoutValiant']['imBonusUI'], inline: true},
        )
    }

    //return fields
}
