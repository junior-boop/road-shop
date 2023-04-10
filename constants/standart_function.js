export function ArrayOf({table, number}){
    let obj = {}
    obj.suiteNormal = []
    obj.suiteInverse = []

    const checkNumber = number > table.length ? table.length : number

    for(let i = 0; i < checkNumber; i++){
        if( table[i] !== undefined){
            obj.suiteNormal.push(table[i])
            obj.suiteInverse.push(table[checkNumber - i])
        }
    }
    return obj
}