module.exports = function(embed, data_file, config){
    Object.entries(data_file.LootTables).forEach((each_loot_table) => {
      Object.entries(each_loot_table[1].items).forEach((each_item) => {
            embed.addField(each_item[1].displayName, `${each_item[1].name} [[${each_item[0]}]](${config.explorer_link_domain}objects/${each_item[0]})`, true)
        })
    })
}