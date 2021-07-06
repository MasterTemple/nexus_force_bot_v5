module.exports = function(data_file){
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

    return [
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