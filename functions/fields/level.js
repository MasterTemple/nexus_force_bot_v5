module.exports = function(embed, data_file, config, level){

    var required = data_file[level].requiredUScore
    var this_level = data_file[level].fromPreviousLevel
    required = required.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this_level = this_level.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    embed.addFields(
        { name: 'Requirements', value: `**For Level ${level}:**`, inline: true },
        { name: `From Level ${parseInt(level)-1}`, value: `${this_level} Experience`, inline: true },
        { name: 'Total', value: `${required} Experience`, inline: true },
    )
}