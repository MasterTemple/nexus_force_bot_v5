module.exports = function(embed, config, skillToCDGFile, skillData, skillID){

    //this was copy pasted




    let desc = ``
    if(skillToCDGFile[skillID]['Description'] !== undefined){
        desc = `${desc}**${skillToCDGFile[skillID]['Description']}**\n`
    }
    if(skillToCDGFile[skillID]['cdg'] !== undefined){
        desc = `${desc}Cooldown Group: **${skillToCDGFile[skillID]['cdg']}**\n`
    }
    if(skillData.imaginationCost !== null && skillData.cooldownTime !== null){
        desc = `${desc}Imagination Cost: **${skillData.imaginationCost}** ${config.emojis.imagination}\nCooldown Time: **${skillData.cooldownTime}** Seconds\n`
    }
    if(skillData.imBonusUI !== null){
        desc = `${desc}Bonus: **${skillData.imBonusUI}** ${config.emojis.imagination}\n`
    }
    if(skillData.armorBonusUI !== null){
        desc = `${desc}Bonus: **${skillData.armorBonusUI}** ${config.emojis.armor}\n`
    }
    if(skillData.lifeBonusUI !== null){
        desc = `${desc}Bonus: **${skillData.lifeBonusUI}** ${config.emojis.heart}\n`
    }


    if(skillToCDGFile[skillID]['damageCombo'] !== undefined){
        desc = `${desc}Damage Combo: **${skillToCDGFile[skillID]['damageCombo']}**\n`
    }
    if(skillToCDGFile[skillID]['ChargeUp'] !== undefined){
        desc = `${desc}ChargeUp: **${skillToCDGFile[skillID]['ChargeUp']}**\n`
    }
    embed.setDescription(desc)
}