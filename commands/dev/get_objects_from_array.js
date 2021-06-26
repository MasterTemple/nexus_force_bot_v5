module.exports = {
    name: ['array'],
    description: 'View all object names, display names, and types.',
    use: 'array [ids]',
    example:['array [7415, 7415]'],
    notes: 'This is a command used to view how to buy an item.',
    search_type: 'bricks_or_items',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let description = ''
        let arr = eval(message.content.match(/\[.*]/g)[0])
        // console.log(arr)
        let sql_objects = require('./../../output/references/sql_objects.json')
        let objects_in_the_array = sql_objects.filter(each_object => arr.includes(each_object.id))
        // console.log(objects_in_the_array)
        embed.setTitle(`Array Stuff`)
        embed.setThumbnail(config['universe_icon'])
        embed.setURL(`${config['explorer_link_domain']}objects`)

        objects_in_the_array.forEach((each_object, counter) => {
            description =`${description}${counter}. **${each_object?.displayName}** (${each_object?.name}), __${each_object?.type}__ [${each_object.id}]\n`
            if(description.length > 4000){
                embed.setDescription(description)
                message.channel.send(embed)
                description = ''
            }
            if(counter === objects_in_the_array.length-1){
                embed.setDescription(description)
                message.channel.send(embed)
            }
        })




        return [, , , message_data]
    }
}
