module.exports = function(page, max_pages, data_file){
    let previous_is_disabled = false
    let next_is_disabled = false
    let mission_giver_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }
    if(data_file.isMissionGiver !== 1){
        mission_giver_is_disabled = true
    }
    return [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "Missions",
                    "style": 1,
                    "custom_id": "default.npcmissions"
                },
                {
                    "type": 2,
                    "label": "Vendor",
                    "style": 3,
                    "custom_id": "default.npcvendor",
                    "disabled": mission_giver_is_disabled
                },
                {
                    "type": 2,
                    "label": "Previous",
                    "style": 1,
                    "custom_id": "default.npcvendor_previous",
                    "disabled": previous_is_disabled
                },
                {
                    "type": 2,
                    "label": "Next",
                    "style": 1,
                    "custom_id": "default.npcvendor_next",
                    "disabled": next_is_disabled
                },
            ]
        }
    ]
}