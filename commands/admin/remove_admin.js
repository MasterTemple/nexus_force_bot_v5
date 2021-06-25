module.exports = {
    name: ['removeadmin', 'removeadmins'],
    description: 'Remove a user\'s administrator permissions',
    use: 'removeadmin [user_id]',
    example:['removeadmin 703120460023463986', 'removeadmin @MasterTemple'],
    notes: 'Remove a user\'s administrator permissions',
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let admin_mentions = []
        let admin_ids = message.content.match(/(\d)+/g)

        message?.mentions?.users.forEach((each_mention) => {
            admin_mentions.push(each_mention.id)
        })
        let admins_to_remove = [...admin_ids, ...admin_mentions]
        console.log(admins_to_remove)
        const fs = require('fs')

        config.administrators = config.administrators.filter(function(each_user) {
            return !admins_to_remove.includes(each_user)
        })
        await fs.writeFile("config.json", JSON.stringify(config, null, 2), function (err) {
                if (err) throw err;
            }
        )
        return ["Done ✅", , , ]
    }
}