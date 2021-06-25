module.exports = function(MessageActionRow, buttons){
    let components = []
    buttons?.forEach( (each_button_row, index) => {
        let button_row = new MessageActionRow()
        each_button_row.forEach((each_button) => {
            button_row.addComponent(each_button)
        })
        components[index] = button_row
    })
    return components

}