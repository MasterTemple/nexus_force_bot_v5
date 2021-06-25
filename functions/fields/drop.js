module.exports = function(embed, info_file, config, message_info) {
    // parameters['has_pages'] = true
    // let page
    // if(parameters['page']){
    //     page = parameters['page']
    // }else{
    //     page = 0
    // }
    var dropFile = info_file

    if(dropFile.itemComponent.levelRequirement === undefined){
        dropFile.levelRequirement = 0
    }
    let displayFractions = false


    //console.log(img)

    let embedArray = []
    var embedField = function(name, value, inline){
        let obj = {
            name: name,
            value: value,
            inline: inline
        }

        return obj
    };

    var dropsSomething = false
    for(var e=0;e<Object.keys(dropFile.buyAndDrop.LootMatrixIndexes).length;e++){

        if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName !== undefined) {
            //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                // console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
                if(displayFractions){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)
                }
            }else if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop !== dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop){
                if(displayFractions){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }
            }else{
                if(displayFractions){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.DestructibleComponent)[0]]?.enemyNames.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }
            }
            dropsSomething = true
        }
        if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent.lenth !== 0 && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]] !== undefined && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]].includes("Wishing") === false && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]].includes("Race") === false) {
            //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                if(displayFractions){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)
                }
            }else if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop !== dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop){
                if(displayFractions){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }
            }else{
                if(displayFractions){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.ActivityComponent)[0]], `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }
            }
            dropsSomething = true
        }
        if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent && dropFile.buyAndDrop?.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.overallChance?.percent !== 0 && dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName !== undefined) {
            //console.log(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]])
            if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop == 1){
                if(displayFractions){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}`, false)
                }
            }else if(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop !== dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop){
                if(displayFractions){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} - ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].maxToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }
            }else{
                if(displayFractions){
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a 1 in ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.howManyToKill} chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }else{
                    embed.addField(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]]?.PackageComponent)[0]]?.displayName, `Has a ${(Math.round(dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].overallChance.percent * 10000) / 10000).toFixed(4)}% chance to drop ${dropFile.buyAndDrop.LootMatrixIndexes[Object.keys(dropFile.buyAndDrop.LootMatrixIndexes)[e]].minToDrop} ${dropFile.itemInfo.displayName}s`, false)
                }
            }
            dropsSomething = true
        }



    }


    // if(!dropsSomething){
    //     embed.addFiels{`This Item Is Not Dropped`, "Try **!earn** or **!buy** to see how to unlock this item!", false)
    //     message.channel.send(embed)
    // }

    // let groupedFields = {}
    // let embed_divide_number = config.embed_sizes.loot
    // for(let i=0;i<=embedArray.length/embed_divide_number;i++){
    //     groupedFields[i] = []
    // }
    // embedArray.forEach(function(em, count){
    //     groupedFields[Math.floor(count/embed_divide_number)].push(em)
    // })
    //console.log(groupedFields[page])
    // parameters['max_pages'] = Math.floor(embedArray.length/embed_divide_number)
    // fields = groupedFields[page.toString]
    // return groupedFields[page]

}