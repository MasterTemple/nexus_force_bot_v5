module.exports = function(type="objects", text) {
  text = text.toLowerCase()
  let args = text.split(/[ ,'_-]+/g)
  let dataFile = require(`./../output/autocomplete/${type}.json`)
  let results = []
  for(let item of dataFile){
    // if(item.lname.includes(text)){
    // if(item.lname.every(e=>e.includes(args))){
    let num = item.value
    if(args.every(e=>item.lname.includes(e))){
      if(type === "activity"){
        num = `${item.name} [${item.value}]`
      }
      results.push({
        name: `${item.name} [${item.value}]`,
        value: num
      })
      if(results.length === 15) break;
    }
  }
  return results
}