const Discord = require('discord.js')
const fs = require('fs')
let config = require('./config.json')
// const intents = new Discord.Intents(Discord.Intents.ALL);
// const intents = new Discord.Intents(Discord.Intents.ALL);
// const client = new Discord.Client({ intents: intents });
// const client = new Discord.Client()
const client = new Discord.Client({
    presence: {
        status: 'online',
        activities: [
            {
                name: config.startup_status,
                type: 'STREAMING',
                url: 'https://www.twitch.tv/directory/game/Lego%20Universe'
            }
        ],
    },
    intents: ['GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILDS']
})



const initialize_commands = require('./functions/initialize/get_commands')
const command_types = ['default', 'admin', 'dev', 'buttons']
let create_embed = require('./functions/create_embed')
let components_from_2d_button_array = require('./functions/create_components_from_buttons')
const search = require('./functions/search')
var message_info = {}

const command_requirements = {
    default: [],
    admin: config.administrators,
    dev: config.developers
} //imports the list of users that are allowed to use each type of command

command_types.forEach(function(command_type){
    initialize_commands(fs, client, command_type, Discord) //creates collections of different types of commands
})

client.once('ready', async() => {
    console.log(`${config.name} ${parseFloat(config.version).toFixed( 1)} is ready :)`) //logs that the bot is ready
    // config.bot_channels.forEach((each_channel)=> {
    //     client.channels.cache.get(each_channel).send({content: "Bot updated ☑"})
    // })


    await client.application.commands.set(
        [
            {
                "name":"activity",
                "description":" View what an activity drops",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an activity.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"bricks",
                "description":" View brick information",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of a LEGO brick.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"buy",
                "description":" View how to buy an item or brick",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an item or brick.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"cooldowngroup",
                "description":" View skills in a cooldowngroup",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of a cooldown group.",
                        "type":"INTEGER",
                        "required":true
                    }
                ]
            },
            {
                "name":"drop",
                "description":" View what drops an item",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"earn",
                "description":" View how to earn an item",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"enemy",
                "description":" View enemy stats",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an enemy.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"enemydrop",
                "description":" View what an enemy drops",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an enemy.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"help",
                "description":" Displays help command",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of a command.",
                        "type":3,
                        "required":false,
                        "choices": [
                            {name:"Activity", value: "activity"},
                            {name:"Bricks", value: "bricks"},
                            {name:"Buy", value: "buy"},
                            {name:"Cooldowngroup", value: "cooldowngroup"},
                            {name:"Drop", value: "drop"},
                            {name:"Earn", value: "earn"},
                            {name:"Enemy", value: "enemy"},
                            {name:"Enemydrop", value: "enemydrop"},
                            {name:"Help", value: "help"},
                            {name:"Item", value: "item"},
                            {name:"Kit", value: "kit"},
                            {name:"Level", value: "level"},
                            {name:"Loottable", value: "loottable"},
                            {name:"Meme", value: "meme"},
                            {name:"Mission", value: "mission"},
                            {name:"Npc", value: "npc"},
                            {name:"Package", value: "package"},
                            {name:"Preconditions", value: "preconditions"},
                            {name:"Search", value: "search"},
                            {name:"Simulate", value: "simulate"},
                            {name:"Skill", value: "skill"},
                            {name:"Skillitems", value: "skillitems"},
                            {name:"Tic", value: "tictactoe"},
                            {name:"Vendor", value: "vendor"},
                        ],
                    }
                ]
            },
            {
                "name":"item",
                "description":" View item stats",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"kit",
                "description":" View an item Set",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an item set.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"level",
                "description":" Level information",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter a level.",
                        "type":"INTEGER",
                        "required":true
                    }
                ]
            },
            {
                "name":"loottable",
                "description":" View items in a loot table",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of a loot table.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"meme",
                "description":" Send a LEGO Universe Meme",
                "default_permission":true,
            },
            {
                "name":"mission",
                "description":" View a mission's information",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of a mission.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"npc",
                "description":" View an npc's missions",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an NPC.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"package",
                "description":" View what a package drops",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of a package.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"preconditions",
                "description":" View the preconditions of an item",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"search",
                "description":" Search for Objects",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an object.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"simulate",
                "description":" Simulate a drop from an enemy, package, or activity",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an object.",
                        "type":"STRING",
                        "required":true
                    },
                    {
                        "name":"type",
                        "description":"Select what type of drop this item is.",
                        "type":3,
                        "choices": [
                            {
                                "name": "Activity",
                                "value": "activity"
                            },
                            {
                                "name": "Enemy",
                                "value": "enemy"
                            },
                            {
                                "name": "Package",
                                "value": "package"
                            }
                        ],
                        "required":true
                    },
                    {
                        "name":"enemy",
                        "description":"Enter the name of the enemy.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"skill",
                "description":" View skill stats",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of a skill.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"skillitems",
                "description":" View skill items",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of a skill.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            },
            {
                "name":"tictactoe",
                "description":" Play tic tac toe",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter a user.",
                        "type":6,
                        "required":true
                    }
                ]
            },
            {
                "name":"vendor",
                "description":" View what a vendor sells",
                "default_permission":true,
                "options":[
                    {
                        "name":"name",
                        "description":"Enter the name of an item.",
                        "type":"STRING",
                        "required":true
                    }
                ]
            }
        ]
    )
})

client.on('messageCreate', message => {

    // if(message.mentions.has(client.user.id)){
    //     //checks to see if bot was mentioned, then sends help command
    //     message.content = '!help'
    // }
    // else
    if(message.author.id === client.user.id || message.content[0] !== config.prefix){
        //returns if the user is itself or they do not have the prefix
        return
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/); //each space is a new argument
    const command_name = args.shift().toLowerCase() //sets the command name equal to the first argument,(what is immediately after the prefix)

    command_types.forEach(async function(command_type) {
        if(command_type === 'buttons'){return}
        if(client[command_type].has(command_name) && (command_requirements[command_type].includes(message.author.id) || command_requirements[command_type].length === 0)){ //checks if the command name exists and if the user has the proper permissions or if it is a default command
            const command = client[command_type].get(command_name) //this is the executable command

            try {
                //command.execute(message, command_type, command_name, args)
                // let [text, embed, components] = command.execute(message, search(command_name, return_one, args), 0, create_embed(), {})
                let blank_embed = create_embed(config, config.name, config.github_link, config.bot_icon_url)

                let object_id = search(command?.search_type, true, args)

                let [text, embed, components, returned_message_info] = await command.execute(message, args, config, object_id, 0, blank_embed, [], {})
                // let components = components_from_2d_button_array(disbut.MessageActionRow, buttons)
                // console.log('\n\n\n')
                // console.log(embed)
                if(embed?.fields.length > command?.embed_length){
                    embed.fields = embed.fields.slice(0, command.embed_length)
                }
                //console.log(embed)
                // console.log(JSON.stringify({...embed}, null, 2))
                // console.log(JSON.stringify({...components}, null, 2))
                // await console.log({content: text, embeds: [embed], components: components})
                let sent_message = await message.reply({content: text, embeds: [embed], components: components, allowedMentions: { repliedUser: false }})
                // let sent_message = await message.channel.send({content: text, embeds: [embed], components: components})
                message_info[sent_message.id] = returned_message_info
                setTimeout(() => delete message_info[sent_message.id], config.time_out_ms)
                //console.log('Sent Message:', sent_message.id)


            }catch(error){
                //sends an embed with the object info (used for errors)
                console.log(error)

                let embed = create_embed(config, config.name, config.github_link, config.bot_icon_url)
                let sql_objects = require('./output/references/sql_objects.json')
                let object_id = search('objects', true, args)
                let object = sql_objects.filter(each_object => each_object.id === parseInt(object_id))[0]
                embed.setTitle(`Object Found: ${object?.type}`)
                embed.setDescription("There was an error running this command.")
                embed.addField(`${object?.displayName}`, `${object?.name} [[${object_id}]](${config.explorer_link_domain}objects/${object_id})`)
                await message.channel.send({embeds: [embed]})
            }
        }
    })

})

client.on('interactionCreate', async (interaction) => {
    let was_not_undefined = true
    if(message_info?.[interaction.id] === undefined){
        message_info[interaction.id] = {}
        // message_info[interaction.id] = {}
        was_not_undefined = false
    }
    // console.log(interaction)
    if (interaction.componentType === 'BUTTON') {
        try {

            let button = interaction



                // console.log(button)
            // console.log(message_info[interaction.id])

                message_info[interaction.id]['button_id'] = button.customId
                message_info[interaction.id]['button_clicker'] = button.user.id
                // if (message_info[interaction.id]?.tier) {
                if (button.customId.includes('loottable')) {

                    // console.log(button)
                    message_info[interaction.id].tier = parseInt(button.customId.match(/(?<=_)\d+/g)?.[0])
                    button.customId = button.customId.replace(/_\d+/g, '')
                }



                let command_info = button.customId.replace(/\[.+]/g, '').split(/\./g)
                let command_type = command_info[0]
                let command_name = command_info[1]

                // console.log(command_type)
                // console.log(command_name)
                let old_embed = interaction.message.embeds[0]
                message_info[interaction.id]['fields'] = old_embed.fields
                old_embed.fields = []
                //old_embed.setDescription()
                let id = interaction.message.embeds[0].title.match(/(?<=\[)\d+/g)?.[0]
                let page
                try {
                    page = parseInt(interaction.message.embeds[0].title.match(/(?<=\()\d+/g)[0]) - 1
                } catch {
                    page = 0
                }
                command_name = command_name.replace(/\[[^\]]*]/g, '')
                //removes anything between and including [..] in the button id
                let dont_change_page = ['activity', 'activityf', 'drop', 'dropf', 'package', 'packagef', 'enemydrop', 'enemydropf']
                if (command_name.includes('_next')) {
                    command_name = command_name.replace(/(_next)/g, '')
                    page++
                } else if (command_name.includes('_previous')) {
                    command_name = command_name.replace(/_previous/g, '')
                    page--
                } else if (!dont_change_page.includes(command_name)) {
                    //this way max pages wont transfer over into another command
                    page = 0
                    delete message_info[interaction.id].max_pages
                }

                // console.log(command_type,command_name)
                let command = client[command_type].get(command_name) //this is the executable command
                // console.log(command)
                if (message_info[interaction.id]?.required_users && !message_info[interaction.id]?.required_users?.includes(button.user.id)) {
                    // console.log(message_info[interaction.id])
                    let rejection_reason = "You do not have permission to use this button."
                    if(command.rejection_reason){
                        rejection_reason = command.rejection_reason
                    }
                    await interaction.reply({content: rejection_reason, ephemeral: true})
                    return
                }
                try {
                    //command.execute(message, command_type, command_name, args)

                    let previous_components = interaction.components

                    let args = old_embed.title.match(/(?<=").*(?=")/g)?.[0].split(/ +/g)
                    //console.log(message_info[interaction.id])
                    try {
                        let [text, embed, buttons, returned_message_info] = await command.execute(interaction, args, config, id, page, old_embed, previous_components, message_info[interaction.id])
                        if(returned_message_info['return']){
                            return
                        }
                        let components = buttons

                        if (embed.fields.length > command?.embed_length) {
                            embed.fields = embed.fields.slice(page * command.embed_length, (command.embed_length * page) + command.embed_length)
                        }

                        await interaction.update({content: text, embeds: [embed], components: components})

                        message_info[interaction.id] = {...message_info[interaction.id], ...returned_message_info}
                    }catch(e){
                        console.log(e)
                        if(was_not_undefined){
                            interaction.reply({content: "There was an error executing this component!", ephemeral: true})
                        }else {
                            interaction.reply({content: "The buttons on this message timed out!", ephemeral: true})
                        }
                    }

                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
        }
    if(interaction.componentType === 'SELECT_MENU'){
        // console.log(interaction)
        // interaction.reply({content: "This is not ready yet!", ephemeral: true})
        let id = interaction.values[0].match(/(?<=\[)\d+/g)?.[0]
        let type = interaction.values[0].match(/(\w|\s)+(?= )/g)?.[0]
        // console.log(`-${id}-`)
        // console.log(`-${type}-`)


        let type_to_command_info = {
            "Loot": ['default', 'item'],
            "LEGO brick": ['default', 'brick'],
            "NPC": ['default', 'npc'],
            "UserGeneratedNPCs": ['default', 'npc'],
            "Enemies": ['default', 'enemy'],
            "help": ['default', 'help'],
            "lti": ['default', 'lti'],
            "skill": ['default', 'skill']
        }

        let blank_embed = create_embed(config, config.name, config.github_link, config.bot_icon_url)
        let page = 0
        try{
            let [command_type, command_name] = type_to_command_info?.[type]
            // console.log({command_type, command_name})

            let command = client[command_type].get(command_name) //this is the executable command

            let [text, embed, components, returned_message_info] = await command.execute(interaction.message, interaction.values, config, id, page, blank_embed, [], {})

            if (embed.fields.length > command?.embed_length) {
                embed.fields = embed.fields.slice(page * command.embed_length, (command.embed_length * page) + command.embed_length)
            }
            await interaction.update({content: text, embeds: [embed], components: components})

            message_info[interaction.message.id] = {...message_info[interaction.message.id], ...returned_message_info}
        }catch{
            let rejection_reason = "This command failed."
            try{
                let [command_type, command_name] = type_to_command_info?.[type]

                let command = await client[command_type].get(command_name)
                // console.log({command})
                if(command?.rejection_reason){
                    rejection_reason = command.rejection_reason
                }
            }catch{}

            await interaction.reply({content: rejection_reason, ephemeral: true})
        }

    }
    if (interaction.type === 'APPLICATION_COMMAND') {
        // console.log(interaction)
        // const args = message.content.slice(config.prefix.length).trim().split(/ +/); //each space is a new argument
        // const command_name = args.shift().toLowerCase() //sets the command name equal to the first argument,(what is immediately after the prefix)
        const command_name = interaction.commandName
        const args = interaction.options?.get('name')?.value?.toString()?.split(/ +/) || []
        command_types.forEach(async function(command_type) {
            if(command_type === 'buttons'){return}
            if(client[command_type].has(command_name) && (command_requirements[command_type].includes(interaction.user.id) || command_requirements[command_type].length === 0)){ //checks if the command name exists and if the user has the proper permissions or if it is a default command
                const command = client[command_type].get(command_name) //this is the executable command

                try {
                    //command.execute(message, command_type, command_name, args)
                    // let [text, embed, components] = command.execute(message, search(command_name, return_one, args), 0, create_embed(), {})
                    let blank_embed = create_embed(config, config.name, config.github_link, config.bot_icon_url)

                    let object_id = search(command?.search_type, true, args)

                    let [text, embed, components, returned_message_info] = await command.execute(interaction, args, config, object_id, 0, blank_embed, [], {})
                    // let components = components_from_2d_button_array(disbut.MessageActionRow, buttons)
                    // console.log('\n\n\n')
                    // console.log(embed)
                    if(embed?.fields.length > command?.embed_length){
                        embed.fields = embed.fields.slice(0, command.embed_length)
                    }
                    //console.log(embed)
                    // console.log(JSON.stringify({...embed}, null, 2))
                    // console.log(JSON.stringify({...components}, null, 2))
                    // await console.log({content: text, embeds: [embed], components: components})
                    await interaction.reply({content: text, embeds: [embed], components: components, allowedMentions: { repliedUser: false }})
                    // let sent_message = await message.channel.send({content: text, embeds: [embed], components: components})
                    // console.log(sent_message)
                    // console.log(interaction.reply.id)
                    message_info[interaction.id] = returned_message_info
                    setTimeout(() => delete message_info[interaction.id], config.time_out_ms)
                    //console.log('Sent Message:', sent_message.id)


                }catch(error){
                    //sends an embed with the object info (used for errors)
                    console.log(error)

                    let embed = create_embed(config, config.name, config.github_link, config.bot_icon_url)
                    let sql_objects = require('./output/references/sql_objects.json')
                    let object_id = search('objects', true, args)
                    let object = sql_objects.filter(each_object => each_object.id === parseInt(object_id))[0]
                    embed.setTitle(`Object Found: ${object?.type}`)
                    embed.setDescription("There was an error running this command.")
                    embed.addField(`${object?.displayName}`, `${object?.name} [[${object_id}]](${config.explorer_link_domain}objects/${object_id})`)
                    await interaction.reply({embeds: [embed]})
                }
            }
        })
    }
    // console.log('\n\n\n')
})

// client.on('clickButton', async (button) => {
//     // console.log(message_info[interaction.id]?.required_users, button.clicker.user.id)
//     if(message_info[interaction.id]?.required_users && !message_info[interaction.id]?.required_users?.includes(button.clicker.user.id)) {
//         button.defer()
//         return
//     }
//
//     try {
//         // console.log(button)
//         message_info[interaction.id]['button_id'] = button.id
//         message_info[interaction.id]['button_clicker'] = button.clicker.user.id
//         if(message_info[interaction.id].tier){
//             message_info[interaction.id].tier = parseInt(button.id.match(/(?<=_)\d+/g)[0])
//             button.id = button.id.replace(/_\d+/g, '')
//         }
//         let command_info = button.id.replace(/\[.+]/g, '').split(/\./g)
//         let command_type = command_info[0]
//         let command_name = command_info[1]
//
//         let old_embed = interaction.embeds[0]
//         old_embed.fields = []
//         //old_embed.setDescription()
//         let id = interaction.embeds[0].title.match(/(?<=\[)\d+/g)?.[0]
//         let page
//         try {
//             page = parseInt(interaction.embeds[0].title.match(/(?<=\()\d+/g)[0]) - 1
//         }catch{
//             page = 0
//         }
//         command_name = command_name.replace(/\[[^\]]*]/g, '')
//         //removes anything between and including [..] in the button id
//         let dont_change_page = ['activity','activityf','drop','dropf','package','packagef','enemydrop','enemydropf']
//         if(command_name.includes('_next')){
//             command_name = command_name.replace(/(_next)/g, '')
//             page++
//         }
//         else if(command_name.includes('_previous')){
//             command_name = command_name.replace(/_previous/g, '')
//             page--
//         }else if(!dont_change_page.includes(command_name)){
//             //this way max pages wont transfer over into another command
//             page = 0
//             delete message_info[interaction.id].max_pages
//         }
//
//         // console.log(command_type,command_name)
//         let command = client[command_type].get(command_name) //this is the executable command
//         console.log(command)
//
//         try {
//             //command.execute(message, command_type, command_name, args)
//
//             let previous_components = interaction.components
//
//             let args = old_embed.title.match(/(?<=").*(?=")/g)?.[0].split(/ +/g)
//             //console.log(command_type, command_name)
//             //console.log(client[command_type])
//             let [text, embed, buttons, returned_message_info] = await command.execute(interaction, args, config, id, page, old_embed, previous_components, message_info[interaction.id])
//             //message_info[interaction.id] = returned_message_info
//             console.log(embed, buttons)
//             //this allows for either completed components or buttons in a 2D array
//             let components = buttons
//
//             if(embed.fields.length > command?.embed_length){
//                 embed.fields = embed.fields.slice(page*command.embed_length, (command.embed_length*page)+command.embed_length)
//                 //console.log(embed.fields.join(','))
//             }
//             await interaction.edit({content: text, embeds: [embed], components: components})
//             message_info[interaction.id] = {...message_info[interaction.id], ...returned_message_info}
//
//         }catch(error){
//             console.log(error)
//         }
//
//         //message.channel.edit(text, {embed: embed, components: components})
//
//     }catch(error){
//         console.log(error)
//     }
//     button.defer()
//
//
// })

client.login(config.token)