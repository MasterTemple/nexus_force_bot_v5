module.exports = function(page, max_pages, data_file) {
    let previous_is_disabled = false
    let next_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }
    let lti_names = require('./../../output/references/lti_names.json')
    let options = []
    data_file['drop']['LootTableIndexes'].forEach((each_result) => {
        let emoji_id = '861767165685399552'
        let obj = {
            "label": lti_names[each_result['LootTableIndex']].name.substring(0, 25),
            // "value": each_result.id.toString(),
            "value": `lti [${each_result['LootTableIndex']}]`,
            "description": `${lti_names[each_result['LootTableIndex']].name} [${each_result['LootTableIndex']}]`,
            "emoji": {
                "name": each_result['LootTableIndex'],
                "id": emoji_id
            }
        }
        options.push(obj)
    })

    // console.log(data_file)

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
                    "label": "Previous",
                    "style": 1,
                    "custom_id": "default.enemydrop_previous",
                    "disabled": previous_is_disabled
                },
                {
                    "type": 2,
                    "label": "Next",
                    "style": 1,
                    "custom_id": "default.enemydrop_next",
                    "disabled": next_is_disabled
                },
                {
                    "type": 2,
                    "label": "Percents",
                    "style": 3,
                    "custom_id": "default.enemydrop"
                },
                {
                    "type": 2,
                    "label": "Fractions",
                    "style": 1,
                    "custom_id": "buttons.enemydropf"
                },
                {
                    "type": 2,
                    "label": "Stats",
                    "style": 1,
                    "custom_id": "default.enemy",
                },
            ]

        }
    ]
}