import AsyncStorage from '@react-native-async-storage/async-storage';


export default class DataCache {
    #champ;
    constructor(champ) {
        this.#champ = champ;
    }

    async InitItem(){
        let data = []
        const getItem = await AsyncStorage.getItem(`${this.#champ}`)
        if(getItem === null){
            await AsyncStorage.setItem(`${this.#champ}`, JSON.stringify(data))
        }
    }

    async SetItem(element) {
        let data = []
        const getItem = await AsyncStorage.getItem(`${this.#champ}`)

        if (getItem === null) {
            data.push(element)
            await AsyncStorage.setItem(`${this.#champ}`, JSON.stringify(data))
            return data
        } else {
            data = JSON.parse(getItem)
            data.push(element)
            await AsyncStorage.setItem(`${this.#champ}`, JSON.stringify(data))
            return data
        }

    }

    async GetItem() {
        let value =  await AsyncStorage.getItem(`${this.#champ}`)
        if(value === null){
            await AsyncStorage.setItem(`${this.#champ}`, JSON.stringify([]))
            return value
        }

        return value
    }

    async UpdateItem(id_name, id, element) {
        const data = JSON.parse(await AsyncStorage.getItem(`${this.#champ}`))
        const index = data.findIndex((d) => {
            return d[id_name] === id
        })

        if (element === '' || element === null || element === undefined) throw new Error("Il manque l'element a Update")
        const items = data.fill(element, index, index + 1)
        await AsyncStorage.setItem(`${this.#champ}`, JSON.stringify(items))
        return items
    }

    async Neutre(table){
        const data = table
        await AsyncStorage.setItem(`${this.#champ}`, JSON.stringify(table))
        return data
    }

}