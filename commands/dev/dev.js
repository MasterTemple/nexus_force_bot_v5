module.exports = {
    name: ['dev'],
    description: 'Displays dev command',
    use: `dev`,
    example:[`dev`],
    notes: "This command lists all other commands",
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {

        const fs = require('fs')
        let description = ''
        let commands = []

        const command_files = fs.readdirSync(`./commands/dev`).filter(file => file.endsWith('.js'));
        command_files.forEach(function(each_command_file){
            const command = require(`./${each_command_file}`)
            description = `${description}**${config.prefix}${command.name.join(` ${config.prefix}`)}** ${command.description}\n`
            commands.push({
                name: `${config.prefix}${command.name.join(` ${config.prefix}`)}`,
                description: command.description,
                first_command: command.name[0]
            })
        })
        if(args?.length === 1) {
            let command_name = args[0]
            if(args[0].includes('[')){
                command_name = command_name.match(/(?<=\[).*(?=])/g)[0]
            }
            // console.log(command_name)
            let command_file = require(`./${command_name}`)
            console.log(command_file)
            embed.setTitle(`Command: ${config.prefix}${command_file.name[0]}`)
            embed.setDescription(command_file.description)
            embed.addField(`Usage`, `${config.prefix}${command_file.use}`, true)
            command_file.example.forEach((each_example, counter) => {
                embed.addField(`Example ${counter+1}`, `${config.prefix}${each_example}`, true)
            })
            embed.addField(`Notes`, `${command_file.notes}`, false)
            if(command_file.name.length > 1){
                embed.addField("Aliases", `${config.prefix}${command_file.name.join(` ${config.prefix}`)}`, false)
            }

        }else{
            embed.setDescription(description)
        }
        // console.log(message, args, config, id, page, embed, previous_components, message_data)
        let components_function = require('./../../functions/components/dev')
        let components = components_function(commands)

        return [, embed, components, message_data]

    }
}
