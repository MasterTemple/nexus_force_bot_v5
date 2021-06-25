module.exports = function(message_data, config) {
    let {MessageButton} = require('discord-buttons')

    switch (message_data['stage']) {
        case 'initialize': {
            let accept = new MessageButton()
                .setStyle('green')
                .setLabel('Accept')
                .setID(`default.tic[{"s":"accept"}]`)
            let reject = new MessageButton()
                .setStyle('red')
                .setLabel('Reject')
                .setID(`default.tic[{"s":"reject"}]`)

            let components = [[accept, reject]]
            return components
            break
        }
        case 'reject': {
            let accept = new MessageButton()
                .setStyle('green')
                .setLabel('Accept')
                .setID(`default.tic[{"s":"accept"}]`)
                .setDisabled(true)
            let reject = new MessageButton()
                .setStyle('red')
                .setLabel('Reject')
                .setID(`default.tic[{"s":"reject"}]`)
                .setDisabled(true)

            let components = [[accept, reject]]
            return components
            break
        }
        case 'accept': {
            let factions = {
                assembly: '850419548611280986',
                paradox: '850419548271149097',
                sentinels: '850419548653092905',
                venture: '850419548733440031'
            }
            let components = [[]]
            Object.entries(factions).forEach((each_faction) => {
                let button = new MessageButton()
                    .setStyle('blurple')
                    .setEmoji(each_faction[1])
                    .setID(`default.tic[{"s":"choose_faction","f":"${each_faction[0]}"}]`)
                components[0].push(button)
            })
            message_data['required_users'] = [message_data['challenger'].id, message_data['challenged'].id]

            return components
            break
        }
        case 'choose_faction': {
            let factions = {
                assembly: '850419548611280986',
                paradox: '850419548271149097',
                sentinels: '850419548653092905',
                venture: '850419548733440031'
            }
            let components = [[]]
            // console.log(message_data)
            Object.entries(factions).forEach((each_faction) => {
                let button = new MessageButton()
                    .setStyle('blurple')
                    .setEmoji(each_faction[1])
                    .setID(`default.tic[{"s":"choose_faction","f":"${each_faction[0]}"}]`)

                if (message_data['challenger']['faction'] === each_faction[0]) {
                    button.setDisabled(true)
                    // message_data['required_users'] = message_data['required_users'].filter(function(e) { return e !== message_data['challenger'].id })
                } else if (message_data['challenged']['faction'] === each_faction[0]) {
                    button.setDisabled(true)
                    // message_data['required_users'] = message_data['required_users'].filter(function(e) { return e !== message_data['challenged'].id })
                }

                components[0].push(button)
            })
            return components
            break
        }
        case 'play':
        case 'game_over':{
            let components = [[], [], []]

            for(let tile = 1; tile <=9; tile++){
                let emoji = config.emojis.imagination.match(/\d+/g)[0]
                let button_is_taken = false
                if(message_data['challenger']['tiles'].includes(tile)){
                    emoji = config.emojis[message_data['challenger']['faction']]
                    button_is_taken = true
                }
                if(message_data['challenged']['tiles'].includes(tile)){
                    emoji = config.emojis[message_data['challenged']['faction']]
                    button_is_taken = true
                }
                if(message_data['stage'] === 'game_over'){
                    button_is_taken = true
                }
                // console.log(emoji)
                let button = new MessageButton()
                    .setStyle('blurple')
                    .setEmoji(emoji)
                    .setID(`default.tic[{"s":"play","t":${tile}}]`)
                    .setDisabled(button_is_taken)

                components[Math.floor((tile-1)/3)].push(button)

            }
            return components
            break

        }

            break
    }
}
