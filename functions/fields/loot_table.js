module.exports = function(embed, data_file, config, tier){
    Object.entries(data_file.items).forEach((each_entry) => {
        if(each_entry[1].rarity === tier) {
            embed.addField(each_entry[1].displayName, `${each_entry[1].name} [[${each_entry[0]}]](${config.explorer_link_domain}objects/${each_entry[0]})`, true)
        }
    })
}