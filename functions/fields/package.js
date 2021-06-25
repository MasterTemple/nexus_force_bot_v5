module.exports = function(embed, info_file, config) {

    let activityFile = info_file

    var description = ``
    let title
    let c = 0
    let wasDMed = false
    for(let p=0; p<activityFile.LootTableIndexes.length;p++){
        if(activityFile.LootTableIndexes[p].names.Name === null || activityFile.LootTableIndexes[p].names.Name === undefined){
            activityFile.LootTableIndexes[p].names.Name = activityFile.LootTableIndexes[p].names.AlternateName
        }
        if(activityFile.LootTableIndexes[p].maxToDrop === 1){
            title =`**${activityFile.LootTableIndexes[p].names.Name}** - **${activityFile.LootTableIndexes[p].percent.toFixed(2)}%** For **1** Item\n`
        }
        else if(activityFile.LootTableIndexes[p].minToDrop === activityFile.LootTableIndexes[p].maxToDrop){
            title =`**${activityFile.LootTableIndexes[p].names.Name}** - **${activityFile.LootTableIndexes[p].percent.toFixed(2)}%** For **${activityFile.LootTableIndexes[p].minToDrop}** Items\n`
        }else{
            title =`**${activityFile.LootTableIndexes[p].names.Name}** - **${activityFile.LootTableIndexes[p].percent.toFixed(2)}%** For **${activityFile.LootTableIndexes[p].minToDrop} - ${activityFile.LootTableIndexes[p].maxToDrop}** Items\n`

        }
        let arr = []
        //console.log(Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo))

        // for(let k=0;k<Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo).length;k++){
        //     arr.push(Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo)[k])
        //     console.log(activityFile.LootTableIndexes[p].rarityCount[k])
        //     // if(activityFile.LootTableIndexes[p].rarityCount[k] > 0) {
        //     //     arr.push(Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo)[k])
        //     // }
        // }
        //let c = 0
        for(let k=0;k<Object.keys(activityFile.LootTableIndexes[p].rarityCount).length;k++){
            //console.log(k, activityFile.LootTableIndexes[p].rarityCount[k])
            //console.log(k, activityFile.LootTableIndexes[p].rarityCount[k], Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo))
            if(activityFile.LootTableIndexes[p].rarityCount[k] > 0 && Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo).includes(k.toString())) {
                //console.log("--", k, activityFile.LootTableIndexes[p].rarityCount[k])

                arr.push(k)
            }
            //console.log(activityFile.LootTableIndexes[p].rarityCount[k])
            // if(activityFile.LootTableIndexes[p].rarityCount[k] > 0) {
            //     arr.push(Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo)[k])
            // }
        }

        // console.log(activityFile.LootTableIndexes[p].names.Name)
        // console.log(arr)
        let displayFractions = false
        //console.log(arr)
        if (arr.length !== 0) {
            description = `${description}**Specific** `
            for (let i = 0; i < arr.length; i++) {
                if(displayFractions) {
                    description = `${description}**T${arr[i]}:** 1 in ${Math.round(activityFile.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForSpecific)} `
                }else{
                    description = `${description}**T${arr[i]}:** ${(activityFile.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
                }
            }
            description = `${description}\n**Any** `

            for (let i = 0; i < arr.length; i++) {
                if(displayFractions) {
                    description = `${description}**T${arr[i]}:** 1 in ${Math.round(activityFile.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForAny)} `
                }else{
                    description = `${description}**T${arr[i]}:** ${(activityFile.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForAnyItemIncludingDrop * 100).toFixed(4)}% `
                }
                //description = `${description} ${config.emojis[`rarity${i}`]} ${(activityFile.drop.LootTableIndexes[p].rarityTableInfo[i].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
            }
            //description = `${description}\n\n`
            // try {
            //     // description = `${description}**${activityFile.LootTableIndexes[p].names.Name} [${activityFile.LootTableIndexes[p].LootTableIndex}]**`
            //     description = `${description}**T1:**${(activityFile.LootTableIndexes[p].rarityTableInfo['1'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T2:**${(activityFile.LootTableIndexes[p].rarityTableInfo['2'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T3:**${(activityFile.LootTableIndexes[p].rarityTableInfo['3'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% **T4:**${(activityFile.LootTableIndexes[p].rarityTableInfo['4'].weightedChanceForSpecificItemIncludingDrop * 100).toFixed()}% \n`
            // }catch{}}
        }else{
            //description = `${description}\n`


        }
        // if(description.length > 1900){
        //     embed.addField(title, description, false)
        //     // embed.setDescription(description)
        // }
        c++
        description = `${description} [[${activityFile.LootTableIndexes[p].LootTableIndex}]](${config.explorer_link_domain}objects/loot/table/${activityFile.LootTableIndexes[p].LootTableIndex})`
        embed.addField(title, description, false)
        description = ''
        // if(c === activityFile.LootTableIndexes.length && description !== '' && wasDMed){
        //     embed.addField(title, description, false)
        //     // embed.setDescription(description)
        // }else if(c === activityFile.LootTableIndexes.length && description !== ''){
        //     embed.addField(title, description, false)
        //     // embed.setDescription(description)
        //
        // }

    }
    if(activityFile.LootTableIndexes.length === 0 && wasDMed === false) {
        embed.addField("Nothing", "This activity has no rewards.", false)
    }
}