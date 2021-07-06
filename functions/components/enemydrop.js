module.exports = function(page, max_pages) {
    let previous_is_disabled = false
    let next_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }

    return [
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