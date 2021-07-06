module.exports = function(data_file){
    let preconditions_is_disabled = false
    let package_is_disabled = false

    if(!Object.keys(data_file.components).includes('53')){
        package_is_disabled = true
    }
    if(data_file.itemComponent.preconditions === null || data_file['itemInfo']['type'] === "LEGO brick"){
        preconditions_is_disabled = true
    }

    return [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "Preconditions",
                    "style": 1,
                    "custom_id": "default.preconditions",
                    "disabled": preconditions_is_disabled
                },
                {
                    "type": 2,
                    "label": "Package",
                    "style": 1,
                    "custom_id": "default.package",
                    "disabled": package_is_disabled
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