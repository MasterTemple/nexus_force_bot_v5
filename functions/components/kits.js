module.exports = function(data_file){
    // console.log(data_file)
    // data_file.info.itemIDsArray
    let objects_with_render_comp = require('./../../output/references/objects_with_render_comp.json')
    let all_objects_array = []
    objects_with_render_comp.forEach( (each_object) => {
        if(data_file.info.itemIDsArray.includes(each_object.id.toString())){
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
    // console.log(all_objects_array)
    // console.log(options)
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