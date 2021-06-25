module.exports = function(message, command, args){
    let command_file = require(`./../commands/${command_dir}/${command_name}`)
    let [text, embed, components] = command_file(message, search(command_name, return_one, args), 0, create_embed(), {})
    message.channel.send(text, {embed: embed, components: components})
}