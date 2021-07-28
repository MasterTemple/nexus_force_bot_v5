module.exports = {
    name: ['tic'],
    description: 'Play tic tac toe',
    use: 'tic [args]',
    example:['tic samurai 3'],
    notes: 'This is a command used start a game of tic tac toe.',
    embed_length: 6,
    rejection_reason: "It is not your turn!",
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        // console.log(message?.embeds?.[0]?.fields)
        // console.log(message_data)
        console.log(args)
        if(Object.keys(message_data).length === 0) {
            //first time command is run
            message_data['stage'] = 'initialize'
            message_data['challenger'] = {}
            message_data['challenged'] = {}
            message_data['challenger']['id'] = message.user.id
            message_data['challenger']['faction'] = 'nexus_force'
            message_data['challenger']['tiles'] = []
            message_data['challenged']['id'] = message.options.get('name').value
            message_data['challenged']['faction'] = 'nexus_force'
            message_data['challenged']['tiles'] = []
            message_data['required_users'] = [message_data['challenged']['id']]
        }
        //console.log(message_data)

        let button_obj
        if(message_data?.['button_id']?.match(/(?<=\[).*(?=])/g)?.[0] !== undefined) {
            button_obj = JSON?.parse(message_data?.['button_id']?.match(/(?<=\[).*(?=])/g)?.[0])
        }
        /*
        gets json data from custom button id
        s: stage
        f: faction
        t: tile
         */

        // console.log(button_obj)
        if(button_obj){
            message_data['stage'] = button_obj.s
            if(button_obj.f) {
                if (message_data.button_clicker === message_data.challenged.id) {
                    message_data['challenged']['faction'] = button_obj.f
                } else if (message_data.button_clicker === message_data.challenger.id) {
                    message_data['challenger']['faction'] = button_obj.f
                }
            }
            if(button_obj.t) {
                if (message_data.button_clicker === message_data.challenged.id) {

                    if(!message_data['challenged']['tiles'].includes(button_obj.t)){
                        message_data['challenged']['tiles'].push(button_obj.t)
                    }
                } else if (message_data.button_clicker === message_data.challenger.id) {

                    if(!message_data['challenger']['tiles'].includes(button_obj.t)){
                        message_data['challenger']['tiles'].push(button_obj.t)
                    }
                }
            }
        }
        console.log(message_data)
        // console.log(message_data['challenger']['faction'] , 'nexus_force', message_data['challenged']['faction'],'nexus_force', button_obj?.f, undefined)
        if(message_data?.['challenger']?.['faction'] !== 'nexus_force' && message_data?.['challenged']?.['faction'] !== 'nexus_force' && message_data?.['stage'] === 'choose_faction'){
            message_data['stage'] = 'play'
            message_data['required_users'] = [message_data['challenged']['id']]
            //this is challenged cause it will be flipped at the end, so the challenger will go first
        }


        let win_conditions = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 5, 9],
            [3, 5, 7],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ]

        try{
            win_conditions.forEach((each_condition) => {
                if (each_condition.every((each_element) => message_data['challenger']['tiles'].includes(each_element))) {
                    message_data['stage'] = 'game_over'
                    message_data['winner'] = {
                        id: message_data['challenger']['id'],
                        faction: message_data['challenger']['faction']
                    }
                    message_data['loser'] = {
                        id: message_data['challenged']['id'],
                        faction: message_data['challenged']['faction']
                    }

                }
                if (each_condition.every((each_element) => message_data['challenged']['tiles'].includes(each_element))) {
                    message_data['stage'] = 'game_over'
                    message_data['winner'] = {
                        id: message_data['challenged']['id'],
                        faction: message_data['challenged']['faction']
                    }
                    message_data['loser'] = {
                        id: message_data['challenger']['id'],
                        faction: message_data['challenger']['faction']
                    }
                }
                if (message_data.challenger.tiles.length + message_data.challenged.tiles.length === 9) {
                    message_data['stage'] = 'game_over'

                }
            })
        }catch{}


        embed.setTitle(`Tic Tac Toe!`)
        embed.setThumbnail(config.universe_icon)
        // console.log(message_data)
        let fields_function = require('./../../functions/fields/tic')
        await fields_function(embed, config, message_data, message.client)

        let components_function = require('./../../functions/components/tic')
        let components = await components_function(message_data, config)

        switch(message_data['stage']){
            case 'initialize': {
                message_data['stage'] = 'accept_or_reject'
            }
            case 'initialize': {
                message_data['stage'] = 'accept_or_reject'
            }
        }



        //changes turn
        if(message_data['stage'] === 'play') {
            if (message_data['required_users'][0] === message_data['challenged']['id']) {
                message_data['required_users'] = [message_data['challenger']['id']]
            } else if (message_data['required_users'][0] === message_data['challenger']['id']) {
                message_data['required_users'] = [message_data['challenged']['id']]

            }
        }

        // console.log(message_data)
        // console.log(message_data.challenger.tiles.length, message_data.challenged.tiles.length)

        return [, embed, components, message_data]
    }
}