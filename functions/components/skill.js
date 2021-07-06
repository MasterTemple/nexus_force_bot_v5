module.exports = function(skill_name, cdg, amount_of_items){
    let has_skill_items = false

    if(amount_of_items === 0){
        has_skill_items = true
    }
    return [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": skill_name,
                    "style": 3,
                    "custom_id": "default.skill",
                },
                {
                    "type": 2,
                    "label": `Cooldown Group: ${cdg}`,
                    "style": 1,
                    "custom_id": "default.cdg",
                },

                {
                    "type": 2,
                    "label": "Skill Items",
                    "style": 1,
                    "custom_id": "default.skillitems",
                    "disabled": has_skill_items,
                },
            ]
        }
    ]
}