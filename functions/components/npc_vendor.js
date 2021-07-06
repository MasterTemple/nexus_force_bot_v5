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
    let objects_with_render_comp = require('./../../output/references/objects_with_render_comp.json')
    let all_objects_array = []
    let sold_items = []
    Object.values(data_file.LootTables).forEach((each_value) => {
        sold_items = [...sold_items, ...Object.keys(each_value.items)]
    })
    objects_with_render_comp.forEach( (each_object) => {
        if(sold_items.includes(each_object.id.toString())){
            all_objects_array.push(each_object)
        }
    })
    let options = []
    let r2e = require('./../../output/references/render_components_to_emoji_id.json')

    all_objects_array.forEach( (each_result, c) => {
        // console.log(c)
        if(c < 25) {
            // console.log(each_result.name, each_result.id, each_result.type)

            let emoji_id = '861767165685399552'
            if(r2e[each_result.rc]){
                emoji_id = r2e[each_result.rc]

            }
            // if(each_result.rc > 0){
            //     emoji_id = r2e[each_result.rc]
            //     console.log(r2e[each_result.rc])
            // }
            let obj = {
                "label": each_result.name.substring(0,24),
                // "value": each_result.id.toString(),
                "value": `${each_result.type} [${each_result.id}]`,
                "description": `${each_result.type} [${each_result.id}]`,
                "emoji": {
                    "name": each_result.type,
                    "id": emoji_id
                }
            }
            options.push(obj)
        }
    })
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