module.exports = function(page, max_pages, data_file, embed_length, is_not_mission_giver){
    let previous_is_disabled = false
    let next_is_disabled = false
    let vendor_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }
    if(data_file.isVendor !== 1){
        vendor_is_disabled = true
    }

    let options = []

    Object.entries(data_file.missions).forEach( (m, c) => {
        if(c < 25) {
            let obj = {
                "label": m[1].MissionStats.MissionText.name.substring(0,100),
                "value": `mission [${m[0]}]`,
                "description": `${m[1].MissionStats.MissionText.description}`.substring(0, 50),
            }
            options.push(obj)
        }
    })

    if(!is_not_mission_giver) {
        return [
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Missions",
                        "style": 3,
                        "custom_id": "default.npcmissions",
                        "disabled": is_not_mission_giver
                    },
                    {
                        "type": 2,
                        "label": "Vendor",
                        "style": 1,
                        "custom_id": "default.npcvendor",
                        "disabled": vendor_is_disabled
                    },
                    {
                        "type": 2,
                        "label": "Previous",
                        "style": 1,
                        "custom_id": "default.npcmissions_previous",
                        "disabled": previous_is_disabled
                    },
                    {
                        "type": 2,
                        "label": "Next",
                        "style": 1,
                        "custom_id": "default.npcmissions_next",
                        "disabled": next_is_disabled
                    },
                ]
            }
        ]
    }else{
        return [
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": "item",
                        "options": options,
                        "placeholder": "Select an item",
                        "min_values": 1,
                        "max_values": 1
                    }
                ]
            },
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Missions",
                        "style": 3,
                        "custom_id": "default.npcmissions",
                    },
                    {
                        "type": 2,
                        "label": "Vendor",
                        "style": 1,
                        "custom_id": "default.npcvendor",
                        "disabled": vendor_is_disabled
                    },
                    {
                        "type": 2,
                        "label": "Previous",
                        "style": 1,
                        "custom_id": "default.npcmissions_previous",
                        "disabled": previous_is_disabled
                    },
                    {
                        "type": 2,
                        "label": "Next",
                        "style": 1,
                        "custom_id": "default.npcmissions_next",
                        "disabled": next_is_disabled
                    },
                ]
            }
        ]
    }
}