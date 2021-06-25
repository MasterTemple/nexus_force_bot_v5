module.exports = function(fs, client, command_name, Discord){
        const command_files = fs.readdirSync(`./commands/${command_name}`).filter(file => file.endsWith('.js'));
        client[command_name] = new Discord.Collection()
        for (const file of command_files) {
            const command = require(`./../../commands/${command_name}/${file}`)
            command.name.forEach(function(each_command_name){
                client[command_name].set(each_command_name, command)
            })

        }
}