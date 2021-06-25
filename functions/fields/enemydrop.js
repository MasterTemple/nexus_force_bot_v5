module.exports = function(embed, info_file, config) {

    let enemy_file = info_file['drop']

    var description = ``
    let title
    let c = 0
    let wasDMed = false
    for(let p=0; p<enemy_file.LootTableIndexes.length;p++){
        if(enemy_file.LootTableIndexes[p].names.Name === null || enemy_file.LootTableIndexes[p].names.Name === undefined){
            enemy_file.LootTableIndexes[p].names.Name = enemy_file.LootTableIndexes[p].names.AlternateName
        }
        if(enemy_file.LootTableIndexes[p].maxToDrop === 1){
            title =`**${enemy_file.LootTableIndexes[p].names.Name}** - **${enemy_file.LootTableIndexes[p].percent.toFixed(2)}%** For **1** Item\n`
        }
        else if(enemy_file.LootTableIndexes[p].minToDrop === enemy_file.LootTableIndexes[p].maxToDrop){
            title =`**${enemy_file.LootTableIndexes[p].names.Name}** - **${enemy_file.LootTableIndexes[p].percent.toFixed(2)}%** For **${enemy_file.LootTableIndexes[p].minToDrop}** Items\n`
        }else{
            title =`**${enemy_file.LootTableIndexes[p].names.Name}** - **${enemy_file.LootTableIndexes[p].percent.toFixed(2)}%** For **${enemy_file.LootTableIndexes[p].minToDrop} - ${enemy_file.LootTableIndexes[p].maxToDrop}** Items\n`

        }
        let arr = []

        for(let k=0;k<Object.keys(enemy_file.LootTableIndexes[p].rarityCount).length;k++){
            if(enemy_file.LootTableIndexes[p].rarityCount[k] > 0 && Object.keys(enemy_file.LootTableIndexes[p].rarityTableInfo).includes(k.toString())) {

                arr.push(k)
            }
        }

        let displayFractions = false
        if (arr.length !== 0) {
            description = `${description}**Specific** `
            for (let i = 0; i < arr.length; i++) {
                if(displayFractions) {
                    description = `${description}**T${arr[i]}:** 1 in ${Math.round(enemy_file.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForSpecific)} `
                }else{
                    description = `${description}**T${arr[i]}:** ${(enemy_file.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForSpecificItemIncludingDrop * 100).toFixed(4)}% `
                }
            }
            description = `${description}\n**Any** `

            for (let i = 0; i < arr.length; i++) {
                if(displayFractions) {
                    description = `${description}**T${arr[i]}:** 1 in ${Math.round(enemy_file.LootTableIndexes[p].rarityTableInfo[arr[i]].howManyToKillForAny)} `
                }else{
                    description = `${description}**T${arr[i]}:** ${(enemy_file.LootTableIndexes[p].rarityTableInfo[arr[i]].weightedChanceForAnyItemIncludingDrop * 100).toFixed(4)}% `
                }
            }
        }else{


        }
        c++
        description = `${description} [[${enemy_file.LootTableIndexes[p].LootTableIndex}]](${config.explorer_link_domain}objects/loot/table/${enemy_file.LootTableIndexes[p].LootTableIndex})`
        embed.addField(title, description, false)
        description = ''

    }
    if(enemy_file.LootTableIndexes.length === 0 && wasDMed === false) {
        embed.addField("Nothing", "This activity has no rewards.", false)
    }
}