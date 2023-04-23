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
        userid: '',
        commandeid : ''
    }),
        ListProductsModal = {
            listProductModal,
            setListProductModal
        }

    const [optionalModal, setOptionalModal] = useState({
        state: false,
        userid: '',
        commandeid : ''
    }),
        OptionalModalConfig = {
            optionalModal,
            setOptionalModal
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
        const includes = user.filter(el => el.userid === userid)

        if(includes.length > 0){
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



    const UpdateLocalCommandeItemId = async (id_name, id, payload) => {

        const index = commandItems.findIndex((d) => {
            return d[id_name] === id
        })
        const items = commandItems.fill(payload, index, index + 1)
        setCommandItems(items)

        await CommandesItems.UpdateItem(id_name, id, payload).then((d) => {
            console.log('1', d)
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
        const NewCommandItems = commandItems.filter(el => el.commandeid !== id)
        
        await Commandes.Neutre(NewCommands).then((d) => {
            setCommand(d)
        })

        await CommandesItems.Neutre(NewCommandItems).then((d) => {
            setCommandItems(d)
        })
    }

    const SupprimerCommadeItems = async (id) => {
        const NewCommandItems = commandItems.filter(el => el.commandeitemid !== id)
        
        await CommandesItems.Neutre(NewCommandItems).then((d) => {
            setCommandItems(d)
        })
    }

   

    const InitDataBase = async (database) => {
        await database.Neutre([]).then((d) => {
            console.log(d)
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

        // InitDataBase(CommandesItems)

    }, [])

    const localDb = { localCategories, localItems, localUser, localCommande, localCommandeItems }

    return (
        <GlobalContext.Provider value={{
            localDb,
            ListProductsModal,
            OptionalModalConfig,
            AddUser,
            SetCategoriesDB,
            SetItemsDB,
            SetLocalUser,
            SetLocalCommande,
            SetLocalCommandeItems,
            SupprimerUser,
            SupprimerCommade,
            SupprimerCategorie,
            SupprimerCommadeItems,
            UpdateLocalCommandeItemId,
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
