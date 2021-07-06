module.exports = function(level){
    let previous_is_disabled = false
    let next_is_disabled = false

    if(parseInt(level) === 1){
        previous_is_disabled = true
    }
    if(parseInt(level) === 85){
        next_is_disabled = true
    }
    return [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": `Level ${level-1}`,
                    "style": 1,
                    "custom_id": "default.level_previous",
                    "disabled": previous_is_disabled
                },
                {
                    "type": 2,
                    "label": `Level ${parseInt(level)+1}`,
                    "style": 1,
                    "custom_id": "default.level_next",
                    "disabled": next_is_disabled
                },
            ]

        }
    ]
}