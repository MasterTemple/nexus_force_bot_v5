module.exports = function(embed, config, items, id) {
    Object.keys(items).forEach((each_item_id) => {
        if(items[each_item_id].displayName && items[each_item_id].name) {
            embed.addField(items[each_item_id].displayName, `${items[each_item_id].name} [[${each_item_id}]](${config.explorer_link_domain}objects/${each_item_id})`)
        }
    })

}