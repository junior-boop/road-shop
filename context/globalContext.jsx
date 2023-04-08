import { createContext, useContext, useState, useEffect, Children } from "react";
import DataCache from "../database/schema";



const GlobalContext = createContext()


export default function GlobalProvider ({children}) {
    const Categories = new DataCache('Categories')
    const Items = new DataCache('Items')
    const DayList = new DataCache('Daylist')
    const User = new DataCache('Users')
    
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

    const [user, setUser] = useState([]),
        localUser = {
            user, 
            setUser
        }

    const [day, setDay] = useState([]),
        localDay = {
            day, 
            setDay
        }
    
    const [listProductModal, setListProductModal] = useState({
        state : false,
        userid : ''
    }),
        ListProductsModal = {
            listProductModal, 
            setListProductModal
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

    const SetLocalUser = async (payload) => {
        await User.SetItem(payload).then(d => {
           setUser(d)
        })
    }
    

    const SupprimerCategorie = async (id) => {
        const NewCat = categories.filter( el => el.categorie_id !== id)
        const NewIte = items.filter(el => el.categorie_id !== id )

        await Categories.Neutre(NewCat).then((d) => {
            setCategories(d)
        })

        await Items.Neutre(NewIte).then((d) => {
            setItems(d)
        })
    }

    const SupprimerUser = async (id) => {
        const NewUse = user.filter(el => el.userid !== id )

        await User.Neutre(NewUse).then((d) => {
            setUser(d)
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
        // DayList.GetItem().then((d) => {
        //     const toJSon = JSON.parse(d)
        //     setCategories(toJSon)
        // })

        User.GetItem().then((d) => {
            const toJSon = JSON.parse(d)
            setUser(toJSon)
        })

    }, [])

    const localDb = {localCategories, localItems, localUser}
    
    return(
        <GlobalContext.Provider value= {{
            localDb,
            SetCategoriesDB,
            SetItemsDB, 
            SupprimerCategorie, 
            SetLocalUser,
            ListProductsModal,
            SupprimerUser
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)