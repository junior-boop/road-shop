import AsyncStorage from '@react-native-async-storage/async-storage';


export default class DataCache {
    constructor (champ){
        this.champ = champ;
    }
    
    async SetItem(element){
        let data = []
        const getItem = await AsyncStorage.getItem(`${this.champ}`)

        if(getItem === null) {
            data.push(element)
            await AsyncStorage.setItem(`${this.champ}`, JSON.stringify(data))
            return data
        } else {
            data = JSON.parse(getItem)
            data.push(element)
            await AsyncStorage.setItem(`${this.champ}`, '[]')
            return data
        }
        
    }

    async GetItem(){
        console.log('je fonction')
        return await AsyncStorage.getItem(`${this.champ}`)
    }

    async UpdateItem(id, element){
        const data = JSON.parse( await AsyncStorage.getItem(`${this.champ}`))
        const index = data.findIndex((d) => {
            return d.id === id
        })

        if(element === '' || element === null || element === undefined) throw new Error("Il manque l'element a Update")
        const items = D.fill(element, index, index + 1)
        this.SetItem = element
        return items
    }

}