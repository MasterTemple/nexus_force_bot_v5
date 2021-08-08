module.exports = function(page, max_pages, results, embed_length) {
    let previous_is_disabled = false
    let next_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }
    // console.log(results)
    results = Object.entries(results).slice(page * embed_length, (embed_length * page) + embed_length)

    let options = []
    results.forEach( (each_result, c) => {
        if(c < 25) {
            let obj = {
                "label": each_result[1].missionName.substring(0,100),
                "value": `mission [${each_result[0]}]`,
                "description": `${each_result[1].missionDescription}`.substring(0, 50),
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
                    "label": "Previous",
                    "style": 1,
                    "custom_id": "default.earn_previous",
                    "disabled": previous_is_disabled
                },
                {
                    "type": 2,
                    "label": "Next",
                    "style": 1,
                    "custom_id": "default.earn_next",
                    "disabled": next_is_disabled
                },

                {
                    "type": 2,
                    "label": "Back",
                    "style": 1,
                    "custom_id": "default.item",
                },
            ]
        }
    ]
}