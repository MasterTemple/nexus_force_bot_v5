const Discord = require('discord.js')
const fs = require('fs')
let config = require('./config.json')

// const client = new Discord.Client()
const client = new Discord.Client({
    presence: {
        status: 'online',
        activity: {
            name: config.startup_status,
            type: 'PLAYING'
        },
    },
})
const disbut = require('discord-buttons')
disbut(client)


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
    if(config.startup_status) {
        //client.user.setPresence({activity: {name: config.startup_status}}) //sets a status if the bot has one
        // client.user.setPresence({
        //     status: 'online',
        //     activity: {
        //         name: config.startup_status,
        //         type:'PLAYING',
        //     }
        // })
        // client.clientStatus('mobile')
    }

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

                let [text, embed, buttons, returned_message_info] = await command.execute(message, args, config, object_id, 0, blank_embed, {}, {})
                let components = components_from_2d_button_array(disbut.MessageActionRow, buttons)

                if(embed?.fields.length > command?.embed_length){
                    embed.fields = embed.fields.slice(0, command.embed_length)
                    //console.log(embed.fields.join(','))
                }
                let sent_message = await message.channel.send(text, {embed: embed, components: components})
                message_info[sent_message.id] = returned_message_info
                setTimeout(() => delete message_info[sent_message.id], config.time_out_ms)


            }catch(error){
                console.log(error)
            }
        }
    })
    
})

client.on('clickButton', async (button) => {
    // console.log(message_info[button.message.id]?.required_users, button.clicker.user.id)
    if(message_info[button.message.id]?.required_users && !message_info[button.message.id]?.required_users?.includes(button.clicker.user.id)) {
        button.defer()
        return
    }

    try {
        // console.log(button)
        message_info[button.message.id]['button_id'] = button.id
        message_info[button.message.id]['button_clicker'] = button.clicker.user.id
        if(message_info[button.message.id].tier){
            message_info[button.message.id].tier = parseInt(button.id.match(/(?<=_)\d+/g)[0])
            button.id = button.id.replace(/_\d+/g, '')
        }
        let command_info = button.id.replace(/\[.+]/g, '').split(/\./g)
        let command_type = command_info[0]
        let command_name = command_info[1]

        let old_embed = button.message.embeds[0]
        old_embed.fields = []
        //old_embed.setDescription()
        let id = button.message.embeds[0].title.match(/(?<=\[)\d+/g)?.[0]
        let page
        try {
            page = parseInt(button.message.embeds[0].title.match(/(?<=\()\d+/g)[0]) - 1
        }catch{
            page = 0
        }
        command_name = command_name.replace(/\[[^\]]*]/g, '')
        //removes anything between and including [..] in the button id

        if(command_name.includes('_next')){
            command_name = command_name.replace(/(_next)/g, '')
            page++
        }
        else if(command_name.includes('_previous')){
            command_name = command_name.replace(/_previous/g, '')
            page--
        }else if(!command_name.includes('percent') || !command_name.includes('fraction')){
            //this way max pages wont transfer over into another command
            page = 0
            delete message_info[button.message.id].max_pages
        }

        // console.log(command_type,command_name)
        let command = client[command_type].get(command_name) //this is the executable command
        // let [text, embed, components, returned_message_info] = await command.execute(button.message, config, id, page, old_embed, message_info[button.message.id])
        // message_info[button.message.id] = returned_message_info

        try {
            //command.execute(message, command_type, command_name, args)

            let previous_components = button.message.components

            let args = old_embed.title.match(/(?<=").*(?=")/g)?.[0].split(/ +/g)
            //console.log(command_type, command_name)
            //console.log(client[command_type])
            let [text, embed, buttons, returned_message_info] = await command.execute(button.message, args, config, id, page, old_embed, previous_components, message_info[button.message.id])
            //message_info[button.message.id] = returned_message_info

            //this allows for either completed components or buttons in a 2D array
            let components = buttons
            try{
                components = components_from_2d_button_array(disbut.MessageActionRow, buttons)
            }catch{}
            if(embed.fields.length > command?.embed_length){
                embed.fields = embed.fields.slice(page*command.embed_length, (command.embed_length*page)+command.embed_length)
                //console.log(embed.fields.join(','))
            }
            await button.message.edit(text, {embed: embed, components: components})
            message_info[button.message.id] = {...message_info[button.message.id], ...returned_message_info}

        }catch(error){
            console.log(error)
        }

        //message.channel.edit(text, {embed: embed, components: components})
        
    }catch(error){
        console.log(error)
    }
    button.defer()


})

client.login(config.token)