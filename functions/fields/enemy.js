module.exports = function(embed, data_file, config, client){
    let enemyFile = data_file
    let hpString = `**${enemyFile.itemInfo.life}** ${client.emojis.cache.get(config.emojis.heart)}`
    if(enemyFile.itemInfo.armor !== 0){
        hpString = `${hpString}    **${enemyFile.itemInfo.armor}** ${client.emojis.cache.get(config.emojis.armor)}`
    }

    embed.addFields(
        { name: 'Name', value: enemyFile.itemInfo.name, inline: true },
        { name: 'Health', value: hpString, inline: true },
        //{ name: 'Description', value: enemyFile.itemInfo.description, inline: true },
    )
    Object.keys(enemyFile.overview).forEach(function (el, key){
        let subHeader = config.invisChar
        // if()
        let arr = []
        let ranged = false
        if (enemyFile.overview[el].projectileBehaviorID !== "None") {
            let projectileFile = require(config['output_path']+`behaviors/${Math.floor(enemyFile.overview[el].projectileBehaviorID/256)}/${enemyFile.overview[el].projectileBehaviorID}.json`)
            enemyFile.overview[el].attackTypes = enemyFile.overview[el].attackTypes.concat(projectileFile.overview.attackTypes)
            //console.log(enemyFile.overview[el].attackTypes)
            //console.log('projectile')
        }
        for(let i=0;i<enemyFile.overview[el].attackTypes.length;i++){
            // if(arr.includes(enemyFile.overview[el].attackTypes[i]) === false && enemyFile.overview[el].attackTypes[i] !== "Ranged"){
            //     arr.push(enemyFile.overview[el].attackTypes[i])
            // }


            if(arr.includes(enemyFile.overview[el].attackTypes[i]) === false){
                arr.push(enemyFile.overview[el].attackTypes[i])
            }
            if(enemyFile.overview[el].attackTypes[i] === "Ranged"){
                ranged = true
            }
        }
        if(arr.length === 0){
            arr = ['None']
        }

        if(ranged){
            subHeader = "Projectile Attack"
        }else{
            subHeader = "Melee Attack"
        }
        if(enemyFile.overview[el].damage[0] === undefined){
            enemyFile.overview[el].damage[0] = 0
        }
        embed.addField(config.invis_char, `**Attack ${key+1}**`, false)
        embed.addField(subHeader, `Damage: **${enemyFile.overview[el].damage[0]}**\nCooldown: **${enemyFile.overview[el].cooldown}** Seconds`, true)
        if(enemyFile.overview[el].attackTypes.length === 1) {
            embed.addField("Attack Type", `${arr.join('\n')}`, true)
        }
        if(enemyFile.overview[el].attackTypes.length > 1) {
            embed.addField("Attack Types", `${arr.join('\n')}`, true)
        }

    })
}
