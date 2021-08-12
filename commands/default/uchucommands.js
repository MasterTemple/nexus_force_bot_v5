module.exports = {
    name: ['uchucommands'],
    description: 'View all LEGO Universe Uchu commands!',
    use: 'uchucommands',
    example: ['uchucommands'],
    notes: 'This is a command used to view all LEGO Universe Uchu commands.',
    search_type: 'activities',
    embed_length: 25,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        return new Promise(async(resolve, reject) => {

            async function get_uwuchu_file(){
                return new Promise( (res, rej) => {
                    let axios = require('axios')
                    axios({
                        url: "https://raw.githubusercontent.com/UchuServer/Uchu/dev/Uchu.World/Handlers/Commands/CharacterCommandHandler.cs",
                        method: "GET"
                    }).then((response) => {
                        // console.log(response.data)
                        res(response.data)
                    })
                })
            }

            // let fs = require('fs')
            // let file = fs.readFileSync("C:\\Users\\dgmastertemple\\Documents\\GitHub\\Uchu\\Uchu.World\\Handlers\\Commands\\CharacterCommandHandler.cs", "utf-8")
            let file = await get_uwuchu_file()
            let matches = [...file.matchAll(/\[CommandHandler\(Signature\s+=\s+"(?<name>[^"]+)", Help\s+=\s+"(?<description>[^"]+)",\s+GameMasterLevel\s+=\s+GameMasterLevel\.(?<level>[^\)]+)\)\][^"]+"(?<usage>[^"]+)/g)]
            let commands = []
            matches.forEach(e => {
                commands.push({
                    name: e.groups.name,
                    description: e.groups.description,
                    level: e.groups.level,
                    usage: e.groups.usage
                })
            })
            // let { MessageEmbed } = require('discord.js')
            delete embed.thumbnail
            delete embed.url
            // let admin_embed = new MessageEmbed().setTitle("Admin Commands").setColor(config.color).setAuthor(config.name, config.bot_icon_url, embed.author.url).setTimestamp().setFooter(config.footer, config.bot_icon_url);
            let type = message.options.get("type").value
            embed.setTitle(`${type} Commands`)

            commands.forEach((each_command) => {
                let usage = each_command.usage.replace(/(Usage: )?\//g, "")
                if(!usage.includes('<')){
                    usage = each_command.name
                }
                if((each_command.level === "Player" || each_command.level === "Mythran") && type === "Player") {
                    embed.addField(`/${usage}`, each_command.description, true)
                } else if(each_command.level === "Admin" && type === "Admin") {
                    embed.addField(`/${usage}`, each_command.description, true)

                }
            })

            // await message.reply({embeds: [embed, admin_embed]})

            // message_data.repied = true
            resolve([, embed, , message_data])
        })

    }
}