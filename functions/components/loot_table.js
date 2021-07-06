module.exports = function(page, max_pages, tier, lti_file){
    let previous_is_disabled = false
    let next_is_disabled = false

    if(parseInt(page) === 0){
        previous_is_disabled = true
    }
    if(max_pages === page){
        next_is_disabled = true
    }
    let tier_comps = []

    for(let i = 1; i <=4;i++) {
        let tier_is_disabled = false
        let style = 1
        if (lti_file.byRarity[i].length === 0) {
            tier_is_disabled = true
        }
        if(tier === i){
            style = 3
        }
        let comp = {
            "type": 2,
            "label": `Tier ${i}`,
            "style": style,
            "custom_id": `default.loottable_${i}`,
            "disabled": tier_is_disabled
        }
        tier_comps.push(comp)

    }

    return [
        {
            "type": 1,
            "components": [...tier_comps]
        },
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "Previous",
                    "style": 1,
                    "custom_id": "default.loottable_previous",
                    "disabled": previous_is_disabled
                },
                {
                    "type": 2,
                    "label": "Next",
                    "style": 1,
                    "custom_id": "default.loottable_next",
                    "disabled": next_is_disabled
                },
            ]
        }
    ]
}