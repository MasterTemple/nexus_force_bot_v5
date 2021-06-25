module.exports = {
    name: ['help'],
    description: 'Displays help command',
    use: `help`,
    example:[`help`],
    notes: "This command lists all other commands",
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {

        const fs = require('fs')
        let description = ''

        const command_files = fs.readdirSync(`./commands/default`).filter(file => file.endsWith('.js'));
        command_files.forEach(function(each_command_file){
            const command = require(`./${each_command_file}`)
            description = `${description}**${config.prefix}${command.name.join(` ${config.prefix}`)}** ${command.description}\n`
        })
        embed.setDescription(description)

        let components_function = require('./../../functions/components/help')
        let components = components_function()

        return [, embed, components, message_data]

    }
}
