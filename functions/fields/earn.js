module.exports = function(embed, info_file, config) {



    Object.entries(info_file['earn']).forEach((each_entry) => {
        let mission_id = each_entry[0]
        let each_mission = each_entry[1]

        if(each_mission.rewardCount === 1) {
            embed.addFields({name: `${each_mission['defined_type']} > ${each_mission['defined_subtype']} > ${each_mission['missionName']}`, value: `${each_mission['missionDescription'].substring(0, 1024-77)} [[${mission_id}]](${config['explorer_link_domain']}missions/${mission_id})`, inline: false})
        }else{
            embed.addFields({name: `${each_mission['defined_type']} > ${each_mission['defined_subtype']} > ${each_mission['missionName']}`, value: `${each_mission['missionDescription'].substring(0, 1024-77)} [Gives **${each_mission['rewardCount']}**] [[${mission_id}]](${config['explorer_link_domain']}missions/${mission_id})`, inline: false})
        }
    })

    if(embed.fields.length === 0){
        embed.addFields({name: `This Item Is Not Earned!`, value: "Try **!buy** or **!drop** to see how to unlock this item!", inline: false})
    }


}

