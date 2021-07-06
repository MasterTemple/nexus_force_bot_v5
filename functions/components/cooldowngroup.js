module.exports = function(cdg, page, max_pages, data_file, embed, embed_length) {
    let previous_is_disabled = false
    let next_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }
    let options = []
    let data_fields = embed.fields.slice(page * embed_length, (embed_length * page) + embed_length)
    data_fields.forEach((each_result) => {
        // console.log(each_result)
        let emoji_id = '861767165685399552'
        let desc = each_result.value.replace('[[', '[')
        desc = desc.replace(']]', ']')
        desc = desc.replace(/\(.*\)/g, '')
        let obj = {
            "label": each_result.name.substring(0, 25),
            // "value": each_result.id.toString(),
            "value": `skill [${each_result.value.match(/(?<=\[\[)\d+(?=]])/g)[0]}]`,
            "description": desc.substring(0,50),
            "emoji": {
                "name": each_result['LootTableIndex'],
                "id": emoji_id
            }
        }
        options.push(obj)
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
                    "label": `Cooldown Group: ${cdg}`,
                    "style": 3,
                    "custom_id": "default.cooldowngroup"
                },
                {
                    "type": 2,
                    "label": "Previous",
                    "style": 1,
                    "custom_id": "default.cooldowngroup_previous",
                    "disabled": previous_is_disabled
                },
                {
                    "type": 2,
                    "label": "Next",
                    "style": 1,
                    "custom_id": "default.cooldowngroup_next",
                    "disabled": next_is_disabled
                },

            ]

        }
    ]
}