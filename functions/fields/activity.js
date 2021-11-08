module.exports = function(embed, info_file, config, activity_name) {

    let activityFile = info_file['activities'][activity_name]
    // console.log({activity_name});

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

        for(let k=0;k<Object.keys(activityFile.LootTableIndexes[p].rarityCount).length;k++){
            if(activityFile.LootTableIndexes[p].rarityCount[k] > 0 && Object.keys(activityFile.LootTableIndexes[p].rarityTableInfo).includes(k.toString())) {

                arr.push(k)
            }
        }

        let displayFractions = false
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
            }
        }else{


        }
        c++
        description = `${description} [[${activityFile.LootTableIndexes[p].LootTableIndex}]](${config.explorer_link_domain}objects/loot/table/${activityFile.LootTableIndexes[p].LootTableIndex})`
        embed.addField(title, description, false)
        description = ''

    }
    if(activityFile.LootTableIndexes.length === 0 && wasDMed === false) {
        embed.addField("Nothing", "This activity has no rewards.", false)
    }
}