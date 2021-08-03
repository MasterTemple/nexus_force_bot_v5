module.exports = {
    name: ['back'],
    description: 'View what an activity drops',
    use: 'back [args]',
    example:['back samurai 3'],
    notes: 'This is a command used to view what an activity drops.',
    search_type: 'back',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let channel = await message.client.channels.cache.get("871891794483367997")
        let old_message_id = message_data.button_id.match(/(?<=\[)\d+/g)[0]
        let old_message = await channel.messages.fetch(old_message_id)
        // console.log(old_message_id)
        // console.log(old_message)
        // console.log(message_data)

        // old_message.components.push({
        //     "type": 1,
        //     "components": [{
        //         "type": 2,
        //         "label": "Back",
        //         "style": 4,
        //         "custom_id": `buttons.back[${back_msg_id}]`
        //     }]})

        return [, old_message.embeds[0], old_message.components, message_data]
    }
}