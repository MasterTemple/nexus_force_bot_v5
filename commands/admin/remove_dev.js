module.exports = {
    name: ['removedev', 'removedevs'],
    description: 'Remove a user\'s developer permissions',
    use: 'removedev [user_id]',
    example:['removedev 703120460023463986', 'removedev @MasterTemple'],
    notes: 'Remove a user\'s developer permissions',
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let dev_mentions = []
        let dev_ids = message.content.match(/(\d)+/g)

        message?.mentions?.users.forEach((each_mention) => {
            dev_mentions.push(each_mention.id)
        })
        let devs_to_remove = [...dev_ids, ...dev_mentions]
        console.log(devs_to_remove)
        const fs = require('fs')

        config.developers = config.developers.filter(function(each_user) {
            return !devs_to_remove.includes(each_user)
        })
        await fs.writeFile("config.json", JSON.stringify(config, null, 2), function (err) {
                if (err) throw err;
            }
        )
        return ["Done ✅", , , ]
    }
}