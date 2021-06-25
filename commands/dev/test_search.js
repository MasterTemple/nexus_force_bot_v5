module.exports = {
    name: ['testsearch'],
    description: 'Test a feature',
    use: 'test',
    example:['test'],
    notes: 'This is a command used for testing purposes',
    search_type: 'objects',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        embed.setTitle("Test Search Command!")
        embed.setDescription(id)
        return [, embed, , ]
    }
}
