const Discord = require('discord.js')
const fs = require('fs')
let config = require('./config.json')

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
const search = require('./functions/search')
let set_slash_commands =require('./functions/set_slash_commands')
let message_info = {}
const command_requirements = {
    default: [],
    admin: config.administrators,
    dev: config.developers
} //imports the list of users that are allowed to use each type of command

command_types.forEach(function(command_type){
    initialize_commands(fs, client, command_type, Discord) //creates collections of different types of commands
})

client.once('ready', async() => {
    await set_slash_commands(client)
    await client.guilds.cache.get("762298384979329114").commands.set([{
            "name":"play",
            "description": "See how to play Uchu!",
            "default_permission":true,
        }])

    // await client.user.setAvatar('https://cdn.discordapp.com/attachments/871696113932046379/871697170594676746/nexus_purple.jpg')
    console.log(`${config.name} ${parseFloat(config.version).toFixed( 1)} is ready :)`) //logs that the bot is ready

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

                console.log(command_type)
                console.log(command_name)
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

                    let previous_components = interaction.message.components

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
                        // console.log(previous_components[previous_components.length-1])
                        if(previous_components?.[previous_components?.length-1].components[0].label === "Back" && command_name !== 'back'){
                            // console.log(previous_components[previous_components.length-1])

                            components.push(previous_components[previous_components.length-1])
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
        // console.log(interaction.message)
        let back_channel = await client.channels.cache.get("871891794483367997")
        let old_content = interaction.message.content
        if(old_content.length === 0){old_content=undefined}
        let back_msg = await back_channel.send({content:old_content, embeds: interaction.message.embeds, components: interaction.message.components})
        let back_msg_id = back_msg.id
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


            components.push({
                "type": 1,
                "components": [{
                        "type": 2,
                        "label": "Back",
                        "style": 4,
                    // "custom_id": `${command_type}.${command_name}[${id}]`
                    "custom_id": `buttons.back[${back_msg_id}]`
                }]})
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
                    if(object_id === undefined){
                        await interaction.reply({content: "There was no object found for this search.", ephemeral: true})
                        return
                    }
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
                    await interaction.reply({content: text, embeds: [embed], components: components, allowedMentions: { repliedUser: false }, ephemeral: returned_message_info.ephemeral})
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
                    delete embed.thumbnail
                    embed.setDescription(`\`\`\`\n${error}\n\`\`\``)
                    embed.setColor("#ff0000")
                    embed.setTitle(`Error: /${interaction.commandName}`)
                    delete embed.url
                    embed.addField("Options", `\`\`\`json\n${JSON.stringify(interaction.options._hoistedOptions, null, 2)}\n\`\`\``)
                    await interaction.reply({content: "There was an error executing this command!", ephemeral: true})
                    await client.channels.cache.get("871696113932046379").send({embeds: [embed]})
                }
            }
        })
    }
    // console.log('\n\n\n')
})

client.login(config.token)