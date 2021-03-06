module.exports = function(page, max_pages, rewards, embed_length){
    let previous_is_disabled = false
    let next_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }
    // console.log(rewards)
    let item_rewards = []
    Object.values(rewards).forEach(e => {
        if(Object.values(e)[0] !== -1) {
            item_rewards.push(Object.values(e)[0])
        }
    })
    // console.log(item_rewards)
    let rcs = require('./../../output/references/objects_with_render_comp.json')
    let results = rcs.filter( e => item_rewards.includes(e.id))

    results = results.slice(page * embed_length, (embed_length * page) + embed_length)

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
                "label": each_result.name.substring(0,100),
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


    if(options.length > 0) {
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
    }else{
        return [

        ]
    }
}
