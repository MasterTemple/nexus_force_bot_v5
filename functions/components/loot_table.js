module.exports = function(page, max_pages, tier, lti_file){
    let previous_is_disabled = false
    let next_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }
    let tier_comps = []

    for(let i = 1; i <=4;i++) {
        let tier_is_disabled = false
        let style = 1
        if (lti_file.byRarity[i].length === 0) {
            tier_is_disabled = true
        }
        if(tier === i){
            style = 3
        }
        let comp = {
            "type": 2,
            "label": `Tier ${i}`,
            "style": style,
            "custom_id": `default.loottable_${i}`,
            "disabled": tier_is_disabled
        }
        tier_comps.push(comp)

    }
    let objects_with_render_comp = require('./../../output/references/objects_with_render_comp.json')
    let all_objects_array = []
    // console.log(lti_file)
    let tier_items = lti_file.byRarity[tier]
    objects_with_render_comp.forEach( (each_object) => {
        if(tier_items.includes(each_object.id)){
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
                "description": `${each_result.type} [${each_result.id}]`.substring(0, 50),
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
            "components": [...tier_comps]
        },
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "Previous",
                    "style": 1,
                    "custom_id": "default.loottable_previous",
                    "disabled": previous_is_disabled
                },
                {
                    "type": 2,
                    "label": "Next",
                    "style": 1,
                    "custom_id": "default.loottable_next",
                    "disabled": next_is_disabled
                },
            ]
        }
    ]
}