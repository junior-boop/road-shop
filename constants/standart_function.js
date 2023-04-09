export function ArrayOf({table, number}){
    const obj = {}
    obj.suiteNormal = []
    obj.suiteInverse = []

    for(let i = 0; i < number; i++){
        obj.suiteNormal.push(table[i])
        obj.suiteInverse.push(table[number - i])
    }

    return obj
}