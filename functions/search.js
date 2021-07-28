module.exports = function(search_type, return_one, args) {
    if(search_type === undefined){
        return 0
    }
    // let args = og_args.split(/ +/)
    let search_for = []
    args.forEach((each_arg) => {
        search_for.push(each_arg.toLowerCase())
    })
    search_for.sort()
    if(search_for.length === 1 && !isNaN(search_for[0])){
        return search_for[0]
    }

    const normal_searches = ["objects", "bricks", "bricks_or_items", "enemies", "items", "kits", "npcs", "packages"]

    try {
        let locale_search_file = require(`./../output/references/${search_type}.json`)
        if (return_one) {
            try {
                if(normal_searches.includes(search_type)) {
                    let match = locale_search_file.find(e => search_for.every(function (el) {
                        return e?.name?.toLowerCase().includes(el)
                    }))
                    return match.id
                }else if(search_type === 'activities'){
                    let match = Object.keys(locale_search_file).find(e => search_for.every(function (el) {
                        return e.toLowerCase().includes(el)
                    }))

                    return locale_search_file[match]
                }else if(search_type === 'missions'){
                    let match = locale_search_file.find(e => search_for.every(function (el) {
                        return e?.name?.toLowerCase().includes(el) || e?.description?.toLowerCase().includes(el) || e?.defined_subtype?.toLowerCase().includes(el)
                    }))
                    //console.log(`==========\n${JSON.stringify(match, null, 2)}\n===========`)
                    return match['id']
                }else if(search_type === 'skills'){
                    let match = Object.keys(locale_search_file).find(e => search_for.every(function (el) {
                        return locale_search_file[e]?.name?.toLowerCase().includes(el)
                    }))
                    return match
                }else if(search_type === 'lti_names'){
                    let match = Object.keys(locale_search_file).find(e => search_for.every(function (el) {
                        return locale_search_file[e]?.name?.toLowerCase().includes(el) || locale_search_file[e]?.altName?.toLowerCase().includes(el)
                    }))
                    return match
                }

            } catch (e) {
                //console.log(e)
                let sql_search_file = require(`./../output/references/sql_${search_type}.json`)

                let match = sql_search_file.find(e => search_for.every(function (el) {
                    return e?.name?.toLowerCase().includes(el) + e?.displayName?.toLowerCase().includes(el)
                }))
                return match?.id
            }
        } else {
            let results = []
            locale_search_file.forEach(function(each_object){
                let match = search_for.every(function (el) {
                    return each_object?.name?.toLowerCase().includes(el)
                })
                if(match){
                    results.push(each_object)
                }
            })
            if(results.length !== 0) {
                return results
            }else {
                let sql_search_file = require(`./../output/references/sql_${search_type}.json`)

                sql_search_file.forEach(function(each_object){
                    let match = search_for.every(function (el) {
                        return each_object?.name?.toLowerCase().includes(el) + each_object?.displayName?.toLowerCase().includes(el)
                    })
                    if(match){
                        results.push(each_object)
                    }
                })
            }
        }
    }catch(e){
        console.log(e)
    }

}