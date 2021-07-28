module.exports = {
    name: ['tictactoe'],
    description: 'Play tic tac toe',
    use: 'tictactoe [user]',
    example:['tictactoe @MasterTemple'],
    notes: 'This is a command used start a game of tic tac toe.',
    embed_length: 6,
    rejection_reason: "It is not your turn!",
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        // console.log(message?.embeds?.[0]?.fields)
        // console.log(message_data)
        // console.log(args)
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
        }else{
            // console.log(message.message)
            // console.log(embed)
            // console.log(message_data.fields)

            // console.log(JSON.stringify(message.message.components[0].components, null, 2))
            // console.log(JSON.stringify(message.message.components, null, 2))



            let factions = {
                "850419548611280986":"assembly",
                "850419548271149097":"paradox",
                "850419548653092905":"sentinels",
                "850419548733440031":"venture",
                "847950505816227871":"nexus_force"
            }
            // console.log(message_data.fields[0].value.match(/(?<=:)\d+(?=>)/g)[0])
            // console.log(message_data.fields[2].value.match(/(?<=:)\d+(?=>)/g)[0])
            // console.log(factions[message_data.fields[0].value.match(/(?<=:)\d+(?=>)/g)[0]])
            // console.log(factions[message_data.fields[2].value.match(/(?<=:)\d+(?=>)/g)[0]])
            message_data['challenger'] = {}
            message_data['challenged'] = {}
            message_data['challenger']['id'] = message_data.fields[0].value.match(/(?<=<@\!?)\d+(?=>)/g)[0]
            // message_data['challenger']['faction'] =  message_data.fields[0].value.match(/(?<=<:?)\w+(?=:)/g)[0]
            message_data['challenger']['faction'] =  factions[message_data.fields[0].value.match(/(?<=:)\d+(?=>)/g)[0]]
            message_data['challenger']['tiles'] = []

            message_data['challenged']['id'] = message_data.fields[2].value.match(/(?<=<@\!?)\d+(?=>)/g)[0]
            // message_data['challenged']['faction'] = message_data.fields[2].value.match(/(?<=<:?)\w+(?=:)/g)[0]
            message_data['challenged']['faction'] =  factions[message_data.fields[2].value.match(/(?<=:)\d+(?=>)/g)[0]]
            message_data['challenged']['tiles'] = []
            if(message_data.fields.length === 3){

                // message_data['required_users'] = [message_data['challenged']['id'], message_data['challenger']['id']]
                message_data['required_users'] = [message_data['challenged']['id']]
            }else if(message_data.fields.length === 4) {
                message_data['required_users'] = [message_data.fields[3].value.match(/(?<=<@\!?)\d+(?=>)/g)[0]]
                if(message.user.id !== message_data.fields[3].value.match(/(?<=<@\!?)\d+(?=>)/g)[0]){
                    message_data['return'] = true
                    await message.reply({content: "It is not your turn!", ephemeral: true})
                    return [, , , message_data]
                }
                // message_data['required_users'] = [message_data['challenged']['id'], message_data['challenger']['id']]
                // message_data['required_users'] = message_data['required_users'].filter((e) => e !==[message_data.fields[3].value.match(/(?<=<@\!?)\d+(?=>)/g)[0]] )
            }
            else if(message_data.fields.length === 5) {
                message_data['required_users'] = [message_data['challenged']['id'], message_data['challenger']['id']]
            }
            try{
                message.message.components.forEach((each_component) => {
                    // console.log(each_component.components)
                    each_component.components.forEach((each_sub_component) => {
                        // console.log(each_sub_component.emoji.id)
                        let imagination_emoji = "820200969789767690"
                        if (each_sub_component.emoji.id !== imagination_emoji) {
                            let this_faction = factions[each_sub_component.emoji.id]
                            // console.log(each_sub_component)
                            if (this_faction === message_data['challenger']['faction']) {
                                message_data['challenger']['tiles'].push(parseInt(each_sub_component.customId.match(/(?<="t":)\d/g)[0]))
                            } else if (this_faction === message_data['challenged']['faction']) {
                                message_data['challenged']['tiles'].push(parseInt(each_sub_component.customId.match(/(?<="t":)\d/g)[0]))
                            }
                        }
                    })
                })
            }catch{}
                // message_data['required_users'] = [message_data['challenged']['id']]
        }




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
        if(message_data?.['challenger']?.['faction'] !== 'nexus_force' && message_data?.['challenged']?.['faction'] !== 'nexus_force' && message_data?.['stage'] === 'choose_faction'){
            message_data['stage'] = 'play'
            message_data['required_users'] = [message_data['challenged']['id']]
            //this is challenged cause it will be flipped at the end, so the challenger will go first
        }
        // console.log(message_data.required_users)

        // console.log(message_data.stage, message.user.id)
        // console.log(message_data.required_users?.length > 0 , !message_data.required_users.includes(message.user.id) , message_data.stage !== 'initialize' , (message_data.stage !=='play' , message_data.challenger.tiles.length === 0))
        if(message_data.required_users?.length > 0 && !message_data.required_users.includes(message.user.id) && message_data.stage !== 'initialize' && (message_data.stage !=='play' && message_data.challenger.tiles.length === 0)){
            message_data['return'] = true
            await message.reply({content: "It is not your turn!", ephemeral: true})
            return [, , , message_data]
        }else{

        }

        // console.log(message_data)
        // console.log(message_data['challenger']['faction'] , 'nexus_force', message_data['challenged']['faction'],'nexus_force', button_obj?.f, undefined)



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

        let components_function = require('../../functions/components/tic')
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
        // console.log(message.id)
        return [, embed, components, message_data]
    }
}