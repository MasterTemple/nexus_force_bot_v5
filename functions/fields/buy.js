module.exports = function(embed, info_file, config) {
    /*
    this is literally copy pasted from the old version
    i will rewrite this later lol
     */


    const buyFile = info_file
    let fields = []
    let vendor_count = 0

    if(buyFile.itemComponent.levelRequirement === undefined){
        buyFile.levelRequirement = 0
    }

    if(buyFile.itemComponent.altCurrencyCost !== null){
        embed.addFields(
            {name: "Cost", value: buyFile.itemComponent.buyPrice.toString(), inline: true},
            {name: `${buyFile.itemComponent.altCurrencyDisplayName} Cost`, value: buyFile.itemComponent.altCurrencyCost.toString(), inline: true},
            {name: "Level Requirement", value: buyFile.itemComponent.levelRequirement.toString(), inline: true},
        )
    }else if(buyFile.itemComponent.commendationCurrencyCost !== null){
        embed.addFields(
            {name: "Cost", value: buyFile.itemComponent.buyPrice.toString(), inline: true},
            {name: `${buyFile.itemComponent.commendationCurrencyDisplayName} Cost`, value: buyFile.itemComponent.commendationCurrencyCost.toString(), inline: true},
            {name: "Level Requirement", value: buyFile.itemComponent.levelRequirement.toString(), inline: true},
        )
    }else if(buyFile.itemComponent.commendationCurrencyCost === null){
        embed.addFields(
            {name: "Cost", value: buyFile.itemComponent.buyPrice.toString(), inline: true},
            {name: "Stack Size", value: buyFile.itemComponent.stackSize.toString(), inline: true},
            {name: "Level Requirement", value: buyFile.itemComponent.levelRequirement.toString(), inline: true},
        )
    }

    var vendorInfo = ``
    if(buyFile.buyAndDrop?.Vendors?.length === 0){
        buyFile.buyAndDrop.Vendors = []
    }
    if(buyFile.commendationVendor===undefined){
        buyFile.commendationVendor = []
    }
    for(var e=0;e<buyFile.buyAndDrop.Vendors.length;e++){
        if(buyFile.buyAndDrop.Vendors[e].displayName !== null) {
            vendor_count++
            vendorInfo = `${vendorInfo}${buyFile.buyAndDrop.Vendors[e].displayName} [[${buyFile.buyAndDrop.Vendors[e].id}]](${config.explorer_link_domain}objects/${buyFile.buyAndDrop.Vendors[e].id}/16)\n`
        }
    }
    let vendorInfo2
    if(vendorInfo.length > 1024) {
        // vendorInfo2 = vendorInfo.slice(1)
        vendorInfo = vendorInfo.substring(0, 1024)
    }
    if(buyFile.buyAndDrop.Vendors.length === 1){
        embed.addFields({name: `Vendor [${vendor_count}]:`, value: vendorInfo, inline: false})
    }else if(buyFile.buyAndDrop.Vendors.length > 1){
        embed.addFields({name: `Vendors [${vendor_count}]:`, value: vendorInfo, inline: false})
    }else if(buyFile.commendationVendor.length === 1 && buyFile.commendationCost !== null){
        embed.addFields({
            name: `Vendor:`,
            value: `Honor Accolade - Commendation Vendor [[13806]](${luExplorerURL}objects/13806/16`,
            inline: false
        })
    }else if(buyFile.type === "LEGO brick"){
        embed.addFields({
            name: `Vendor:`,
            value: `${buyFile.brickVendorDisplayName} [${buyFile.brickVendorID}]`,
            inline: false
        })
    }else{
        embed.addFields({
            name: `This Item Is Not Sold!`,
            value: "Try **!earn** or **!drop** to see how to unlock this item!",
            inline: false
        })
    }

    // if(vendorInfo2){
    //     embed.addFields({name: `More:`, value: vendorInfo2, inline: false})
    // }

    return fields



}