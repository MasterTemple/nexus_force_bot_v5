module.exports = {
    name: ['meme'],
    description: 'Send a LEGO Universe Meme',
    use: 'meme',
    example:['meme'],
    notes: 'This is a command used to send you a LEGO Universe Meme.',
    search_type: 'kits',
    embed_length: 24,
    async execute(message, args, config, id, page, embed, previous_components, message_data) {
        const axios = require('axios')
        async function get_data() {
            return new Promise((resolve, reject) => {
                axios({
                    url: "https://www.reddit.com/r/nexusforcememes.json",
                    method: "GET"
                }).then(res => {
                    // console.log(res.data)
                    resolve(res.data)
                })
            })
        }
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        let data = await get_data()
        let data_file = data.data.children[getRandomInt(data.data.children.length)]['data']
        console.log(data_file)
        embed.setAuthor(data_file.author)
        embed.setTitle(data_file.title)
        embed.setURL("https://www.reddit.com"+data_file.permalink)
        embed.setImage(data_file.url)
        delete embed.thumbnail
        // let fields_function = require('./../../functions/fields/kits')
        // fields_function(embed, data_file, config, message.client)

        // let components_function = require('./../../functions/components/kits')
        // let components = components_function(data_file)

        return [, embed, , message_data]
    }
}
