import { createContext, useContext, useState, useEffect, Children } from "react";
import DataCache from "../database/schema";



const GlobalContext = createContext()


export default function GlobalProvider ({children}) {
    const Categories = new DataCache('Categories')
    const Items = new DataCache('Items')
    
    const [categories, setCategories] = useState([]),
        localCategories = {
            categories, 
            setCategories
        }
    const [items, setItems] = useState([]),
        localItems = {
            items, 
            setItems
        }
    
    const SetCategoriesDB = async (payload) => {
        await Categories.SetItem(payload).then(d => {
            console.log(d)
        })
    }

    const SetItemsDB = async (payload) => {
        await Items.SetItem(payload).then(d => {
            console.log(d)
        })
    }

    const SupprimerCategorie = async (id) => {
        const NewCat = categories.filter( el => el.categorie_id !== id)
        const NewIte = items.filter(el => el.categorie_id !== id )

        console.log(NewCat, NewIte)

        await Categories.Neutre(NewCat).then((d) => {
            setCategories(d)
        })

        await Items.Neutre(NewIte).then((d) => {
            setItems(d)
        })
    }

    useEffect(() => {
        Items.GetItem().then(d => {
            const toJSon = JSON.parse(d)
            setItems(toJSon)
        })
        Categories.GetItem().then((d) => {
            const toJSon = JSON.parse(d)
            setCategories(toJSon)
        })
    }, [])

    const localDb = {localCategories, localItems}
    
    return(
        <GlobalContext.Provider value= {{
            localDb,
            SetCategoriesDB,
            SetItemsDB, 
            SupprimerCategorie
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)