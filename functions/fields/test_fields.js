module.exports = function(embed){
    let first_line = `**Specific** => **T1** 100% **T2** 100% **T3** 100% **T4** 100%`
    let second_line = `**Any** => **T1** 100% **T2** 100% **T3** 100% **T4** 100% [[670]](https://lu.lcdruniverse.org/explorer/objects/loot/table/670)`

    embed.addField('**Faction Token Proxy** - **__100%__** for **__20__** Items',
        `${first_line}\n${second_line}`)
}