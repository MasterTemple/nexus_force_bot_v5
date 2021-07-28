module.exports = function(embed, item_file, config, search, enemy_package_or_activity_args){
    // let type = message.options.get('type').value
    // let enemy = message.options.get('enemy').value
    // enemy_package_or_activity_args = message.options.get('enemy').value
    let activity_id =  search('activities', true, enemy_package_or_activity_args.split(/ +/g))
    let enemy_id =  search('enemies', true, enemy_package_or_activity_args.split(/ +/g))
    let package_id =  search('packages', true, enemy_package_or_activity_args.split(/ +/g))
    let rarity = item_file.itemComponent.rarity.toString()

    let lmis = [...Object.keys(item_file.buyAndDrop.LootMatrixIndexes)]
    let ltis = [...item_file.buyAndDrop.LootTableIndexes]
    // console.log(lmis)
    let chance = 0
    let name
    let its_the_activity_file
    let its_the_enemy_file
    let its_the_package_file
    let activity_file
    let package_file
    let enemy_file
    try{
        activity_file = require(`${config['output_path']}activities/${activity_id}.json`)
        Object.values(activity_file.activities).forEach( (each_activity) => {
            if(lmis.includes(each_activity.LootMatrixIndex.toString())){
                its_the_activity_file = true


                let activity_names = [...Object.keys(activity_file.activities)]
                let search_for = []
                enemy_package_or_activity_args.split(/ +/g).forEach((each_arg) => {
                    search_for.push(each_arg.toLowerCase())
                })
                search_for.sort()
                let activity_name = activity_names.find(e => search_for.every(function (el) {
                    return e?.toLowerCase().includes(el)
                }))
                // console.log(activity_name)




                Object.values(item_file.buyAndDrop.LootMatrixIndexes).forEach(each_lti => {
                    // console.log(each_lti.ActivityComponent)
                    if(each_lti.ActivityComponent.includes(activity_name)){
                        chance = each_lti['overallChance']['howManyToKill']
                        name = activity_name
                    }

                    // Object.values(each_lti.DestructibleComponent).forEach((each_d_comp) => {
                    //     if(each_d_comp.enemyID === parseInt(enemy_id)){
                    //         chance = each_lti['overallChance']['howManyToKill']
                    //         name = enemy_file['itemInfo']['displayName']
                    //     }
                    // })
                })
            }
        })
    }catch{
        its_the_activity_file = false
    }
    try{
        enemy_file = require(`${config['output_path']}enemies/${enemy_id}.json`)
        if(lmis.includes(enemy_file.drop.LootMatrixIndex.toString())){
            its_the_enemy_file = true

            Object.values(item_file.buyAndDrop.LootMatrixIndexes).forEach(each_lti => {
                Object.values(each_lti.DestructibleComponent).forEach((each_d_comp) => {
                    if(each_d_comp.enemyID === parseInt(enemy_id)){
                        chance = each_lti['overallChance']['howManyToKill']
                        name = enemy_file['itemInfo']['displayName']
                    }
                })

            })

        }
    }catch(e){
        //console.log(e)
        its_the_enemy_file = false
    }
    try{
        package_file = require(`${config['output_path']}packages/${package_id}.json`)
        if(lmis.includes(package_file.LootMatrixIndex.toString())) {
            its_the_package_file = true

            Object.values(item_file.buyAndDrop.LootMatrixIndexes).forEach(each_lti => {
                Object.keys(each_lti.PackageComponent).forEach((each_package_lti) => {
                    if (parseInt(each_package_lti) === package_file.LootMatrixIndex) {
                        chance = each_lti['overallChance']['howManyToKill']
                        name = package_file['itemInfo']['displayName']
                    }
                })

            })
        }
    }catch(e){
        its_the_package_file = false
    }


    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }


    // console.log(`its_the_activity_file: ${its_the_activity_file}`)
    // console.log(`its_the_enemy_file: ${its_the_enemy_file}`)
    // console.log(`its_the_package_file: ${its_the_package_file}`)
    // console.log(`chance: ${chance}`)
    // console.log(`name: ${name}`)
    let roll = 0
    let not_rolled = true
    if(its_the_activity_file || its_the_enemy_file || its_the_package_file && parseInt(chance) !== 1){
        while (not_rolled) {
            let num = getRndInteger(0, chance + 1)
            //console.log(num)
            roll++
            if (num === chance) {
                not_rolled = false
                roll = roll.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
                chance = chance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
                if (roll[roll.length - 1] === '1' && roll[roll.length - 2] !== '1') {
                    embed.addField(`1 in ${chance} chance to drop ${item_file.itemInfo.displayName} from ${name}`, `You got one on your ${roll}st roll!`, false)
                } else if (roll[roll.length - 1] === '2' && roll[roll.length - 2] !== '1') {
                    embed.addField(`1 in ${chance} chance to drop ${item_file.itemInfo.displayName} from ${name}`, `You got one on your ${roll}nd roll!`, false)
                } else if (roll[roll.length - 1] === '3' && roll[roll.length - 2] !== '1') {
                    embed.addField(`1 in ${chance} chance to drop ${item_file.itemInfo.displayName} from ${name}`, `You got one on your ${roll}rd roll!`, false)
                } else {
                    embed.addField(`1 in ${chance} chance to drop ${item_file.itemInfo.displayName} from ${name}`, `You got one on your ${roll}th roll!`, false)
                }

            }
        }
    }else if(parseInt(chance) === 1){
        embed.addField(`1 in 1 chance to drop ${item_file.itemInfo.displayName} from ${name}`, `You got one on your 1st roll!`, false)

    }else if(its_the_activity_file === undefined && its_the_enemy_file === undefined && its_the_package_file === undefined){
        embed.addField("Error", `No match found for "${enemy_package_or_activity_args}"` , false)

    }else{
        embed.addField("Error", `${item_file?.itemInfo?.displayName} is not dropped by the first result for the enemy, package, or activity` , false)
        let activity_name
        try{
            activity_name = Object?.keys(activity_file?.activities)?.[0]?.match(/T?[^\d]+(?= )/g)?.[0]
        }catch{
            activity_name = undefined
        }
         embed.addField("Activity Found:",  `${activity_name} [[${activity_id}]](${config.explorer_link_domain}activities/${activity_id})`, false)
         embed.addField("Enemy Found:", `${enemy_file?.['itemInfo']?.['displayName']} [[${enemy_id}]](${config.explorer_link_domain}objects/${enemy_id})`, false)
         embed.addField("Package Found:", `${package_file?.['itemInfo']?.['displayName']} [[${package_id}]](${config.explorer_link_domain}objects/${package_id})`, false)
    }

    // let its_the_activity_file = check_activity_file(activity_id)
    // let its_the_enemy_file = check_enemy_file(enemy_id)
    // let its_the_package_file = check_package_file(package_id)
    // let the_id
    // Object.entries(item_file.buyAndDrop.LootMatrixIndexes).forEach((each_entry) => {
    //     if(Object.keys(each_entry[1].DestructibleComponent).length !== 0) {
    //         Object.entries(each_entry[1].DestructibleComponent).forEach((each_destructible_component) => {
    //             if (each_destructible_component[1]['enemyID'] === parseInt(enemy_id)) {
    //                 the_id = enemy_id
    //             }
    //         })
    //     }
    //     if(the_id !== undefined){return}
    //     if(Object.keys(each_entry[1].PackageComponent).length !== 0){
    //         Object.entries(each_entry[1].PackageComponent).forEach((each_package_component) => {
    //             console.log(each_package_component[1])
    //             if(each_package_component[1]['enemyID'] === parseInt(enemy_id)){
    //                 the_id = enemy_id
    //             }
    //         })
    //     }
    //     if(the_id !== undefined){return}
        //console.log(each_entry[1])
    // })
    // console.log('THE ID:', the_id)

    if(its_the_enemy_file){
        return enemy_id
    }else if(its_the_package_file){
        return package_id
    }else{
        return name
    }
}