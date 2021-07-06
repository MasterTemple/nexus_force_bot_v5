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
                    "custom_id": "buttons.dropf_previous",
                    "disabled": previous_is_disabled
                },
                {
                    "type": 2,
                    "label": "Next",
                    "style": 1,
                    "custom_id": "buttons.dropf_next",
                    "disabled": next_is_disabled
                },
                {
                    "type": 2,
                    "label": "Percents",
                    "style": 1,
                    "custom_id": "default.drop"
                },
                {
                    "type": 2,
                    "label": "Fractions",
                    "style": 3,
                    "custom_id": "buttons.dropf"
                },
                {
                    "type": 2,
                    "label": "Back",
                    "style": 1,
                    "custom_id": "default.item"
                },

            ]

        }
    ]
}