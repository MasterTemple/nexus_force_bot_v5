module.exports = function(name){
    let { MessageButton } = require('discord-buttons')
    let roll_again = new MessageButton()
        .setStyle('blurple')
        .setLabel('Roll Again')
        .setID(`default.simulate[${name}]`)


    let components = [[roll_again]]
    return components
}
