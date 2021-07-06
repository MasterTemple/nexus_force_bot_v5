module.exports = function(name){
    return [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "Roll Again",
                    "style": 1,
                    "custom_id": `default.simulate[${name}]`,
                }
            ]

        }
    ]
}