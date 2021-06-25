module.exports = {
    name: ['comp', 'comps'],
    description: 'Test a feature',
    use: 'test',
    example:['test'],
    notes: 'This is a command used for testing purposes',
    search_type: 'objects',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        let data_file = {

        }
        embed.setTitle(`Test Components Command! [7415] (${page+1})`)
        //embed.setDescription('test')
        //let fields_function = require('./../../functions/fields/test_fields')
        //fields_function(embed)


        let components_function = require('./../../functions/components/test_components')
        let components = components_function(page)
        message_data['test'] = 'some value'
        message_data['times_clicked'] = 0
        return [, embed, components, message_data]
    }
}
