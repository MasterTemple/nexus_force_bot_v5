module.exports = function(page, max_pages, results){
    let options = []

    // let r2e = require('C:\\Users\\dgmastertemple\\IdeaProjects\\personal_bot\\render_components_to_emoji_id.json')
    let r2e = require('./../../output/references/render_components_to_emoji_id.json')
    results.forEach( (each_result, c) => {
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
                "value": each_result.id.toString(),
                "description": `${each_result.type} [${each_result.id}]`,
                "emoji": {
                    "name": "item",
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
        }
    ]
}
