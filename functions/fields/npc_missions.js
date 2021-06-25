module.exports = function(embed, data_file, config){

    Object.entries(data_file.missions).forEach( each_mission => {
        // console.log(each_mission[1])
        if(each_mission[1]?.MissionStats?.MissionText?.name && each_mission[1]?.MissionStats?.MissionText?.description) {
            embed.addField(each_mission[1].MissionStats.MissionText.name, `${each_mission[1].MissionStats.MissionText.description.replace(/<[^>]+>/g, '')} [[${each_mission[0]}]](${config.explorer_link_domain}missions/${each_mission[0]})`,)
        }
    })


}