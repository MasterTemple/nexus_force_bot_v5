module.exports = function(message_data, config) {
    switch (message_data['stage']) {
        case 'initialize': {
            return [
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Accept",
                            "style": 3,
                            "custom_id": `default.tic[{"s":"accept"}]`,
                        },
                        {
                            "type": 2,
                            "label": "Reject",
                            "style": 4,
                            "custom_id": `default.tic[{"s":"reject"}]`,
                        },
                    ]
                }
            ]
        }
        case 'reject': {
            return [
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Accept",
                            "style": 3,
                            "custom_id": `default.tic[{"s":"accept"}]`,
                            "disabled": true
                        },
                        {
                            "type": 2,
                            "label": "Reject",
                            "style": 4,
                            "custom_id": `default.tic[{"s":"reject"}]`,
                            "disabled": true
                        },
                    ]
                }
            ]
        }
        case 'accept': {

            let factions = {
                assembly: '850419548611280986',
                paradox: '850419548271149097',
                sentinels: '850419548653092905',
                venture: '850419548733440031'
            }
            let components = []
            Object.entries(factions).forEach((each_faction) => {
                // let button = new MessageButton()
                //     .setStyle('blurple')
                //     .setEmoji(each_faction[1])
                //     .setID(`default.tic[{"s":"choose_faction","f":"${each_faction[0]}"}]`)

                let button = {
                    "type": 2,
                    "emoji": each_faction[1],
                    "style": 1,
                    "custom_id": `default.tic[{"s":"choose_faction","f":"${each_faction[0]}"}]`,
                }
                components.push(button)
            })

            return [{
                "type": 1,
                "components": components
            }
            ]
        }
        case 'choose_faction': {
            let factions = {
                assembly: '850419548611280986',
                paradox: '850419548271149097',
                sentinels: '850419548653092905',
                venture: '850419548733440031'
            }
            let components = []
            Object.entries(factions).forEach((each_faction) => {
                // let button = new MessageButton()
                //     .setStyle('blurple')
                //     .setEmoji(each_faction[1])
                //     .setID(`default.tic[{"s":"choose_faction","f":"${each_faction[0]}"}]`)
                let button_is_disabled = false
                if (message_data['challenger']['faction'] === each_faction[0]) {
                    button_is_disabled = true
                } else if (message_data['challenged']['faction'] === each_faction[0]) {
                    button_is_disabled = true
                }
                let button = {
                    "type": 2,
                    "emoji": each_faction[1],
                    "style": 1,
                    "custom_id": `default.tic[{"s":"choose_faction","f":"${each_faction[0]}"}]`,
                    "disabled": button_is_disabled
                }
                components.push(button)
            })

            return [{
                "type": 1,
                "components": components
            }
            ]

        }
        case 'play':
        case 'game_over':{
            let components = [[], [], []]

            for(let tile = 1; tile <=9; tile++){
                let emoji = config.emojis.imagination.match(/\d+/g)[0]
                let button_is_disabled = false
                if(message_data['challenger']['tiles'].includes(tile)){
                    emoji = config.emojis[message_data['challenger']['faction']]
                    button_is_disabled = true
                }
                if(message_data['challenged']['tiles'].includes(tile)){
                    emoji = config.emojis[message_data['challenged']['faction']]
                    button_is_disabled = true
                }
                if(message_data['stage'] === 'game_over'){
                    button_is_disabled = true
                }
                // console.log(emoji)

                let button = {
                    "type": 2,
                    "emoji": emoji,
                    "style": 1,
                    "custom_id": `default.tic[{"s":"play","t":${tile}}]`,
                    "disabled": button_is_disabled
                }
                components[Math.floor((tile-1)/3)].push(button)

            }
            return [{
                "type": 1,
                "components": components[0]
            },
            {
                "type": 1,
                "components": components[1]
            },
            {
                "type": 1,
                "components": components[2]
            }
            ]
        }
    }


}