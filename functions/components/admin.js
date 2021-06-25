module.exports = function(){
    let { MessageButton } = require('discord-buttons')
    let default_commands = new MessageButton()
        .setStyle('blurple')
        .setLabel('Default Commands')
        .setID('default.help')
    let admin_commands = new MessageButton()
        .setStyle('green')
        .setLabel('Admin Commands')
        .setID('admin.admin')
    let dev_commands = new MessageButton()
        .setStyle('blurple')
        .setLabel('Dev Commands')
        .setID('dev.dev')

    let components = [[default_commands, admin_commands, dev_commands]]
    return components
}
