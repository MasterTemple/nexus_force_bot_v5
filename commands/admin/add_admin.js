module.exports = {
    name: ['addadmin', 'addadmins'],
    description: 'Give a user administrator permissions',
    use: 'addadmin [user_id]',
    example:['addadmin 703120460023463986', 'addadmin @MasterTemple'],
    notes: 'Give a user administrator permissions',
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let new_admin_mentions = []
        let new_admin_ids = message.content.match(/(\d)+/g)

        message?.mentions?.users.forEach((each_mention) => {
            new_admin_mentions.push(each_mention.id)
        })
        const fs = require('fs')
        config.administrators.push(...new_admin_mentions, ...new_admin_ids)
        config.administrators = [...new Set(config.administrators)]
        message.channel.send("Done ✅")
        await fs.writeFile("config.json", JSON.stringify(config, null, 2), function (err) {
                if (err) throw err;
            }
        )
        return [, , , ]
    }
}