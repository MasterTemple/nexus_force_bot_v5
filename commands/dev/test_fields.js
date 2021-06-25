module.exports = {
    name: ['fields'],
    description: 'Test a feature',
    use: 'test',
    example:['test'],
    notes: 'This is a command used for testing purposes',
    search_type: 'objects',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        embed.setTitle("Test Fields Command!")
        //embed.setDescription('test')
        let fields_function = require('./../../functions/fields/test_fields')
        fields_function(embed)

        return [, embed, , ]
    }
}
