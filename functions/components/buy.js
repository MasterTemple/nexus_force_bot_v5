module.exports = function(page, max_pages, data_file, embed_length){
    let drop_is_disabled = false
    let earn_is_disabled = false
    let buy_is_disabled = false

    if(data_file.buyAndDrop.Vendors.length === 0){
        buy_is_disabled = true
    }
    if(Object.keys(data_file.earn).length === 0){
        earn_is_disabled = true
    }
    if(data_file.buyAndDrop.EnemyIDs.length === 0){
        drop_is_disabled = true

    }
    // console.log(data_file.buyAndDrop.Vendors)
    let results = data_file.buyAndDrop.Vendors
    results = results.filter(r => r.displayName !== null)
    results = results.slice(page * embed_length, (embed_length * page) + embed_length)

    let options = []
    results.forEach( (each_result, c) => {
        if(c < 25) {
            // let name = each_result?.displayName?.match(/[^ -]+/g)?.[0] || each_result?.name?.match(/[^ -]+/g)?.[0]
            let name = each_result?.displayName?.match(/[^-]+/g)?.[0]
            let second_name = each_result?.displayName?.match(/[^-]+/g)?.[1] || each_result?.name
            // console.log({name, second_name})
            let obj = {
                "label": name.substring(0,100),
                "value": `vendor [${each_result.id}]`,
                "description": `${second_name}`.substring(0, 50),
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
                    "label": "Drop",
                    "style": 1,
                    "custom_id": "default.drop",
                    "disabled": drop_is_disabled
                },
                {
                    "type": 2,
                    "label": "Earn",
                    "style": 1,
                    "custom_id": "default.earn",
                    "disabled": earn_is_disabled
                },
                {
                    "type": 2,
                    "label": "Buy",
                    "style": 3,
                    "custom_id": "default.buy",
                    "disabled": buy_is_disabled
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