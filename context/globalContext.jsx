import { createContext, useContext, useState, useEffect, Children } from "react";
import DataCache from "../database/schema";



const GlobalContext = createContext()


export default function GlobalProvider({ children }) {
    const Categories = new DataCache('Categories')
    const Items = new DataCache('Items')
    const Commandes = new DataCache('Commandes')
    const CommandesItems = new DataCache('CommandesItems')
    const User = new DataCache('Users')

    const [categories, setCategories] = useState([]),
        localCategories = {
            categories,
            setCategories
        }
    const [addUser, setAddUser] = useState(true),
        AddUser = {
            addUser,
            setAddUser
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

    const [command, setCommand] = useState([]),
        localCommande = {
            command,
            setCommand
        }

    const [commandItems, setCommandItems] = useState([]),
        localCommandeItems = {
            commandItems,
            setCommandItems
        }

    const [listProductModal, setListProductModal] = useState({
        state: false,
        userid: ''
    }),
        ListProductsModal = {
            listProductModal,
            setListProductModal
        }

    const SetCategoriesDB = async (payload) => {
        await Categories.SetItem(payload).then(d => {
            setCategories(d)
        })
    }

    const SetItemsDB = async (payload) => {
        await Items.SetItem(payload).then(d => {
            setItems(d)
        })
    }

    const SetLocalUser = async (payload) => {
        const { userid } = payload
        const includes = user.includes(userid)
        if(includes){
            setUser(user)
        } else {
            await User.SetItem(payload).then(d => {
                setUser(d)
            })
        }
    }

    const SetLocalCommande = async (payload) => {
        await Commandes.SetItem(payload).then(d => {
            setCommand(d)
        })
    }

    const SetLocalCommandeItems = async (payload) => {
        await CommandesItems.SetItem(payload).then(d => {
            setCommandItems(d)
        })
    }

    
    const SupprimerCategorie = async (id) => {
        const NewCat = categories.filter(el => el.categorie_id !== id)
        const NewIte = items.filter(el => el.categorie_id !== id)

        await Categories.Neutre(NewCat).then((d) => {
            setCategories(d)
        })

        await Items.Neutre(NewIte).then((d) => {
            setItems(d)
        })
    }

    const SupprimerUser = async (id) => {
        const NewUse = user.filter(el => el.userid !== id)

        await User.Neutre(NewUse).then((d) => {
            setUser(d)
        })
    }

    const SupprimerCommade = async (id) => {
        const NewCommands = command.filter(el => el.commandeid !== id)
        await Commandes.Neutre(NewCommands).then((d) => {
            setCommand(d)
        })
    }

    const SupprimerCommadeItems = async (id) => {
        const NewCommandItems = commandItems.filter(el => el.userid !== id)

        await CommandesItems.Neutre(NewCommandItems).then((d) => {
            setCommandItems(d)
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

        User.GetItem().then((d) => {
            const toJSon = JSON.parse(d)
            setUser(toJSon)
        })

        Commandes.GetItem().then((d) => {
            const toJSon = JSON.parse(d)
            setCommand(toJSon)
        })

        CommandesItems.GetItem().then((d) => {
            const toJSon = JSON.parse(d)
            setCommandItems(toJSon)
        })

    }, [])

    const localDb = { localCategories, localItems, localUser, localCommande, localCommandeItems }

    return (
        <GlobalContext.Provider value={{
            localDb,
            ListProductsModal,
            AddUser,
            SetCategoriesDB,
            SetItemsDB,
            SetLocalUser,
            SetLocalCommande,
            SetLocalCommandeItems,
            SupprimerUser,
            SupprimerCategorie,
            SupprimerCommade,
            SupprimerCommadeItems,
            CreateThatDay
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)


const CreateThatDay = () => {
    const date = new Date()

    const day = date.getDate()

    const WeekDay = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    const MonthYear = ['Janvier', 'Fervrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']

    const n = day < 10 ? `0${day}` : day;
    const d = WeekDay[date.getDay()]
    const m = MonthYear[date.getMonth()]

    const Dlist = {
        date: `${d}, ${n} ${m}`,
        dateTime: Date.now()
    }

    return {
        n, d, m, Dlist
    }
}
