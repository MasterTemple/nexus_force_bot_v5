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
        activity: {
            name: config.startup_status,
            type: 'PLAYING'
        },
    },
    intents: ['GUILD_MESSAGES', 'DIRECT_MESSAGES']
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

client.once('ready', () => {
    console.log(`${config.name} ${parseFloat(config.version).toFixed( 1)} is ready :)`) //logs that the bot is ready

})

client.on('message', message => {

    if(message.mentions.has(client.user.id)){
        //checks to see if bot was mentioned, then sends help command
        message.content = '!help'
    }
    else if(message.author.id === client.user.id || message.content[0] !== config.prefix){
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

client.on('interaction', async (interaction) => {
    let was_not_undefined = true
    if(message_info?.[interaction.message.id] === undefined){
        message_info[interaction.message.id] = {}
        was_not_undefined = false
    }
    if (interaction.componentType === 'BUTTON') {
        try {

            let button = interaction



                // console.log(button)

                message_info[button.message.id]['button_id'] = button.customID
                message_info[button.message.id]['button_clicker'] = button.user.id
                if (message_info[button.message.id]?.tier) {
                    // console.log(button)
                    message_info[button.message.id].tier = parseInt(button.customID.match(/(?<=_)\d+/g)[0])
                    button.customID = button.customID.replace(/_\d+/g, '')
                }



                let command_info = button.customID.replace(/\[.+]/g, '').split(/\./g)
                let command_type = command_info[0]
                let command_name = command_info[1]

                // console.log(command_type)
                // console.log(command_name)
                let old_embed = button.message.embeds[0]
                old_embed.fields = []
                //old_embed.setDescription()
                let id = button.message.embeds[0].title.match(/(?<=\[)\d+/g)?.[0]
                let page
                try {
                    page = parseInt(button.message.embeds[0].title.match(/(?<=\()\d+/g)[0]) - 1
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
                    delete message_info[button.message.id].max_pages
                }

                // console.log(command_type,command_name)
                let command = client[command_type].get(command_name) //this is the executable command
                // console.log(command)
                if (message_info[button.message.id]?.required_users && !message_info[button.message.id]?.required_users?.includes(button.user.id)) {
                    // console.log(message_info[button.message.id])
                    let rejection_reason = "You do not have permission to use this button."
                    if(command.rejection_reason){
                        rejection_reason = command.rejection_reason
                    }
                    await interaction.reply({content: rejection_reason, ephemeral: true})
                    return
                }
                try {
                    //command.execute(message, command_type, command_name, args)

                    let previous_components = button.message.components

                    let args = old_embed.title.match(/(?<=").*(?=")/g)?.[0].split(/ +/g)
                    //console.log(message_info[button.message.id])
                    try {
                        let [text, embed, buttons, returned_message_info] = await command.execute(button.message, args, config, id, page, old_embed, previous_components, message_info[button.message.id])

                        let components = buttons

                        if (embed.fields.length > command?.embed_length) {
                            embed.fields = embed.fields.slice(page * command.embed_length, (command.embed_length * page) + command.embed_length)
                        }

                        await interaction.update({content: text, embeds: [embed], components: components})

                        message_info[button.message.id] = {...message_info[button.message.id], ...returned_message_info}
                    }catch{
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
            "help": ['default', 'help']
        }

        let blank_embed = create_embed(config, config.name, config.github_link, config.bot_icon_url)
        let page = 0
        try{
            let [command_type, command_name] = type_to_command_info?.[type]

            let command = client[command_type].get(command_name) //this is the executable command

            let [text, embed, components, returned_message_info] = await command.execute(interaction.message, interaction.values, config, id, page, blank_embed, [], {})

            if (embed.fields.length > command?.embed_length) {
                embed.fields = embed.fields.slice(page * command.embed_length, (command.embed_length * page) + command.embed_length)
            }
            await interaction.update({content: text, embeds: [embed], components: components})

            message_info[interaction.message.id] = {...message_info[interaction.message.id], ...returned_message_info}
        }catch{
            await interaction.reply({content:"This command failed.", ephemeral: true})
        }

    }
    // console.log('\n\n\n')
})

// client.on('clickButton', async (button) => {
//     // console.log(message_info[button.message.id]?.required_users, button.clicker.user.id)
//     if(message_info[button.message.id]?.required_users && !message_info[button.message.id]?.required_users?.includes(button.clicker.user.id)) {
//         button.defer()
//         return
//     }
//
//     try {
//         // console.log(button)
//         message_info[button.message.id]['button_id'] = button.id
//         message_info[button.message.id]['button_clicker'] = button.clicker.user.id
//         if(message_info[button.message.id].tier){
//             message_info[button.message.id].tier = parseInt(button.id.match(/(?<=_)\d+/g)[0])
//             button.id = button.id.replace(/_\d+/g, '')
//         }
//         let command_info = button.id.replace(/\[.+]/g, '').split(/\./g)
//         let command_type = command_info[0]
//         let command_name = command_info[1]
//
//         let old_embed = button.message.embeds[0]
//         old_embed.fields = []
//         //old_embed.setDescription()
//         let id = button.message.embeds[0].title.match(/(?<=\[)\d+/g)?.[0]
//         let page
//         try {
//             page = parseInt(button.message.embeds[0].title.match(/(?<=\()\d+/g)[0]) - 1
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
//             delete message_info[button.message.id].max_pages
//         }
//
//         // console.log(command_type,command_name)
//         let command = client[command_type].get(command_name) //this is the executable command
//         console.log(command)
//
//         try {
//             //command.execute(message, command_type, command_name, args)
//
//             let previous_components = button.message.components
//
//             let args = old_embed.title.match(/(?<=").*(?=")/g)?.[0].split(/ +/g)
//             //console.log(command_type, command_name)
//             //console.log(client[command_type])
//             let [text, embed, buttons, returned_message_info] = await command.execute(button.message, args, config, id, page, old_embed, previous_components, message_info[button.message.id])
//             //message_info[button.message.id] = returned_message_info
//             console.log(embed, buttons)
//             //this allows for either completed components or buttons in a 2D array
//             let components = buttons
//
//             if(embed.fields.length > command?.embed_length){
//                 embed.fields = embed.fields.slice(page*command.embed_length, (command.embed_length*page)+command.embed_length)
//                 //console.log(embed.fields.join(','))
//             }
//             await button.message.edit({content: text, embeds: [embed], components: components})
//             message_info[button.message.id] = {...message_info[button.message.id], ...returned_message_info}
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