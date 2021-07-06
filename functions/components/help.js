module.exports = function(commands) {
    let options = []
    commands.forEach( (each_command, c) => {
        if(c < 25) {

            let obj = {
                "label": each_command.name.substring(0,24),
                "value": `help [${each_command.first_command}]`,
                "description": each_command.description.substring(0,50),
                "emoji": {
                    "name": each_command.name[0],
                    "id": '861767165685399552'
                }
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
                    "custom_id": "help",
                    "options": options,
                    "placeholder": "Select a command",
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
                    "label": "Default Commands",
                    "style": 3,
                    "custom_id": "default.help",
                },
                {
                    "type": 2,
                    "label": "Admin Commands",
                    "style": 1,
                    "custom_id": "admin.admin",
                },
                {
                    "type": 2,
                    "label": "Dev Commands",
                    "style": 1,
                    "custom_id": "dev.dev"
                },
            ]
        }
    ]
}