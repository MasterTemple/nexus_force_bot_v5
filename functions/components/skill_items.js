module.exports = function(skill_name, cdg, page, max_pages, items, embed_length){
    // console.log(items)
    let previous_is_disabled = false
    let next_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }
    let objects_with_render_comp = require('./../../output/references/objects_with_render_comp.json')
    let all_objects_array = []
    let item_ids = Object.keys(items)
    objects_with_render_comp.forEach( (each_object) => {
        if(item_ids.includes(each_object.id.toString())){
            //if(items[each_object.id].name) {
                all_objects_array.push(each_object)
            //}
        }
    })
    let options = []
    let r2e = require('./../../output/references/render_components_to_emoji_id.json')

    all_objects_array.forEach( (each_result, c) => {
        // console.log(c)
        if(c < embed_length) {
            // console.log(each_result.name, each_result.id, each_result.type)

            let emoji_id = '861767165685399552'
            if(r2e[each_result.rc]){
                emoji_id = r2e[each_result.rc]

            }

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
    // console.log(options)
    if(options.length === 0){
        return [
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": skill_name,
                        "style": 3,
                        "custom_id": "default.skill",
                    },
                    {
                        "type": 2,
                        "label": "Previous",
                        "style": 1,
                        "custom_id": "default.skillitems_previous",
                        "disabled": previous_is_disabled
                    },
                    {
                        "type": 2,
                        "label": "Next",
                        "style": 1,
                        "custom_id": "default.skillitems_next",
                        "disabled": next_is_disabled
                    },
                ]
            }
        ]
    }else {
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
                        "label": skill_name,
                        "style": 3,
                        "custom_id": "default.skill",
                    },
                    {
                        "type": 2,
                        "label": "Previous",
                        "style": 1,
                        "custom_id": "default.skillitems_previous",
                        "disabled": previous_is_disabled
                    },
                    {
                        "type": 2,
                        "label": "Next",
                        "style": 1,
                        "custom_id": "default.skillitems_next",
                        "disabled": next_is_disabled
                    },
                ]
            }
        ]
    }
}