module.exports = function(embed, info_file, config) {


    const item = info_file




    for(let skill in Object.keys(item.objectSkills)){

        if(item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.name && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.damageCombo && item['objectSkills'][Object.keys(item.objectSkills)[skill]]?.info?.Description){
        }
    }


    var description = `**Preconditions:**`
    try {
        Object.keys(item?.itemComponent?.preconditionDescriptions).forEach(function (element, key) {
            description = `${description}\n**${key + 1}. **${item.itemComponent.preconditionDescriptions[element]}`
        })
    }catch{
        description = `${description}\nThis item has no preconditions.`
    }

    embed.setDescription(description)




}

