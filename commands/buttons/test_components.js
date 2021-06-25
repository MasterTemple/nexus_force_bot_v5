module.exports = {
    name: ['comp', 'comps', 'test_comps'],
    description: 'Test a feature',
    use: 'test',
    example:['test'],
    notes: 'This is a command used for testing purposes',
    search_type: 'objects',
    async execute(message, args, config, id, page, embed, previous_components, message_data) {


        embed.setTitle(`Test Components Command! [7415] (${page})`)
        //embed.setDescription('test')
        //let fields_function = require('./../../functions/fields/test_fields')
        //fields_function(embed)
        message_data['times_clicked']++
        embed.setDescription(`page: ${page}\nid: ${id}`)
        //this is method 1 for components
        let components_function = require('./../../functions/components/test_components')
        let components = components_function()
        //this is method 2
        //let components = message.components
        //message_data['test'] = 'some value'
        Object.entries(message_data).forEach((each_entry) => {
            embed.addField(each_entry[0], each_entry[1], false)
        })

        return [, embed, components, message_data]
    }
}
