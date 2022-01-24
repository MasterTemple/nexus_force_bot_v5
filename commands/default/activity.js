module.exports = {
    name: ['activity'],
    description: 'View what an activity drops',
    use: 'activity [args]',
    example:['activity fv dragon'],
    notes: 'This is a command used to view what an activity drops.',
    search_type: 'activities',
    embed_length: 6,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        // let id = returned_id[1]

        let data_file = require(`${config['output_path']}activities/${id}.json`)
        // console.log({data_file});
        // console.log(message.options._hoistedOptions);
        let activity_name = message.options._hoistedOptions[0].value.match(/[^\[]+(?= )/)[0]
        // if(args !== undefined) {
        //     let search_for = []
        //     args.forEach((each_arg) => {
        //         search_for.push(each_arg.toLowerCase())
        //     })
        //     search_for.sort()
        //     activity_name = Object.keys(data_file.activities).find(e => search_for.every(function (el) {
        //         return e?.toLowerCase().includes(el)
        //     }))
        // }else{
        //     activity_name = embed.title.match(/[^\[]+(?= )/g)[0]
        // }
        // let fs = require('fs')
        // fs.writeFileSync("C:\\Users\\dgmastertemple\\Downloads\\message.json", JSON.stringify(message, null, 2))
        // console.log(message.options._hoistedOptions.first());
        // console.log({activity_name, args});

        embed.setTitle(`${activity_name} [${id}] (${page+1})`)
        embed.setThumbnail(config['image_link_domain']+data_file['iconURL'])
        embed.setURL(`${config['explorer_link_domain']}activities/${id}`)

        let fields_function = require('./../../functions/fields/activity')
        fields_function(embed, data_file, config, activity_name)
        let components_function = require('./../../functions/components/activity')
        if(embed.fields.length % module.exports.embed_length === 0) {
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length) - 1
        }
        else{
            message_data['max_pages'] = Math.floor(embed.fields.length / module.exports.embed_length)
        }
        let components = components_function(page, message_data['max_pages'])
        // console.log(page, message_data)

        return [, embed, components, message_data]
    }
}
