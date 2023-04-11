import { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, Pressable, Animated, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header_Page } from '../components/header';
import { Display, H2, H3, P } from '../components/StyledText';
import { useGlobalContext } from '../context/globalContext';
import constante from '../constants/constante';
import { Ionicons } from '@expo/vector-icons';
import generated_ID from '../constants/id_gen';
import { ArrayOf } from '../constants/standart_function';


type CommandesItemsProps = {
    user_id: string,
    id: string
}

type ClientProp = {
    Client : any
}

export default function Commandes() {

    const { localDb, SetLocalUser, ListProductsModal, CreateThatDay, SetLocalCommande, AddUser } = useGlobalContext()
    const { localUser, localCommande } = localDb
    const {addUser, setAddUser} = AddUser
    const [value, setValue] = useState('')
    const [state, setState] = useState(false)

    const { user } = localUser
    const { command, setCommand } = localCommande
    const { n, d, m, Dlist } = CreateThatDay()

    const handleAddUser = () => {
        const users = {
            name: value,
            userid: generated_ID()
        }

        const commandeObj = {
            commandeid : generated_ID(),
            date: Dlist.date,
            userId: users.userid,
            dateTimes: Date.now()
        }

        setAddUser(!addUser)

        SetLocalUser(users)

        SetLocalCommande(commandeObj)
        setValue('')
    }

    const Close = () => {
        setAddUser(!addUser)
    }

    useEffect(() => {
        setAddUser(true)
    }, [])


    useEffect(() => {
        if(value.length <= 1){
            setState(false)
        } else {
            setState(true)
        }
    }, [value])


    const Com = ({ Client }: ClientProp) => {
        return (
            <>
                <View style={{ paddingVertical: 12 }}>
                    <Display>Jeudi 23 Avril</Display>
                </View>
                {
                    Client && Client.map((el: any, key: number) => <CommandesItems user_id={el.userId} id={el.commandeid} key={key} />)
                }
                <View style={{ marginBottom: 24, position: "relative" }} />
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={'dark'} />
            <View style={{ paddingHorizontal: 16, paddingVertical: 7 }}>
                <Header_Page page_name='Commandes' />
            </View>
            <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
                <Com Client={command} />
            </ScrollView>
            {
                addUser
                    ? (<Pressable onPress={() => setAddUser(!addUser)} style={{ position: 'absolute', bottom: 18, right: 18, width: 62, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5, backgroundColor: constante.color_primary }}>
                        <Ionicons name="md-person-add" size={24} color="white" />
                    </Pressable>)
                    : (<NewUser
                        onPress={handleAddUser}
                        onClose={Close}
                        value={value}
                        onChange={setValue}
                        btnState = {state}
                    />)
            }
            <ModalCommande />
        </SafeAreaView>
    );
}

function ModalCommande() {

    const { localDb, ListProductsModal, SetLocalCommandeItems } = useGlobalContext()
    const { localItems, localUser, localCategories } = localDb
    const { user } = localUser
    const { items } = localItems
    const { categories } = localCategories



    const { listProductModal, setListProductModal } = ListProductsModal
    const [clientName, setClientName] = useState('')

    const HeightValue = useRef(new Animated.Value(0)).current
    const SwitchOn = () => {
        Animated.timing(HeightValue, {
            toValue: 700,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }
    const SwitchOff = () => {
        Animated.timing(HeightValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }


    useEffect(() => {
        listProductModal.state
            ? SwitchOn()
            : SwitchOff()

        const userSelect = user && user.filter((el: any) => el.userid === listProductModal.userid)


        if (userSelect !== null) {
            if (userSelect.length !== 0) {
                setClientName(userSelect[0].name)
            }
        }

    }, [listProductModal])

    const CloseBtn = () => {
        setListProductModal((prev: any) => ({ ...prev, state: false }))
    }

    type CategorieItemsProps = {
        name : string,
        id : string,
        items : any
    }

    const CategorieItems = ({name, id, items} : CategorieItemsProps) => {

        const filtrer = items && items.filter((el : any) =>  el.categorie_id === id)

        const handleCommandeItems = (item) => {
            const commandesItem = {
                commandeid : listProductModal.commandeid,
                userid : listProductModal.userid,
                item : item, 
                madeAt : Date.now(),
                commandeitemid : generated_ID(),
                state : 1,
                amount : parseInt(item.item_price)
            }
            
            SetLocalCommandeItems(commandesItem)
            setListProductModal((prev: any) => ({ ...prev, state: false }))
        }
        
        return(
            <View>
                <P style = {{ paddingVertical : 12}}>{name}</P>
                {
                    filtrer && filtrer.map((el: any, key: number) => (
                        <Pressable onPress = {() => handleCommandeItems(el)} key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 12, backgroundColor: constante.color_secondary, marginBottom: 5, borderRadius: 5 }}>
                            <P>{el.item_name}</P>
                            <P>{el.item_price} XAF</P>
                        </Pressable>))
                }
            </View>
        )
    }

    return (
        <Animated.View style={{ position: 'absolute', bottom: 0, width: constante.width, left: 0, height: HeightValue, backgroundColor: 'white', elevation: 10 }}>

            <View style={{ flexDirection: 'row', marginHorizontal: 16, paddingVertical: 12, alignItems: 'center', justifyContent: 'space-between' }}  >
                <View>
                    <P>Commande pour</P>
                    <H2>{clientName} - {listProductModal.commandeid}</H2>
                </View>
                <Pressable onPress={CloseBtn} style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: constante.color_secondary }}>
                    <Ionicons name="close" size={24} color="black" />
                </Pressable>
            </View>
            <ScrollView style={{ flex: 1, paddingHorizontal: 16, }}>
                {
                    categories && categories.map((el: any, key: number) => (<CategorieItems name={el.categorie_name} id={el.categorie_id} items={items} key={key} />))
                }
                <View style = {{ height : 16 }} />
            </ScrollView>
        </Animated.View>
    )
}

function CommandesItems({ user_id, id }: CommandesItemsProps) {
    const [more, setMore] = useState(false)
    const [display, setDisplay] = useState('none')

    const { localDb, SupprimerCommade, ListProductsModal } = useGlobalContext()
    const { localUser, localCommandeItems } = localDb
    const { user } = localUser
    const { commandItems } = localCommandeItems

    const { listProductModal, setListProductModal } = ListProductsModal

    useEffect(() => {
        more
            ? setDisplay('flex')
            : setDisplay('none')
    }, [more])

    const handleAjoute = () => {
        setListProductModal({ state: true, userid: user_id, commandeid : id })
    }

    const name = user && user.filter((el : any) => el.userid === user_id)
    const commandeUser = commandItems && commandItems.filter((el : any) => el.commandeid === id)


    const ListeCommandeItems = () => {

        

        return(
            <>
                {
                commandeUser 
                && commandeUser.map((el: any, key : number ) => <CommandeItemForUser commandeitemid={el.commandeitemid} item_name = {el.item.item_name} item_price= {el.item.item_price} item_price_de_gros= {el.item.item_price_de_gros} key={key} /> )
                }
            </>
        )
    }

    return (
        <View style={{
            backgroundColor: 'white',
            borderRadius: 7,
            marginBottom: 10,
            height: 'auto',
            borderWidth: 1,
            borderColor: constante.color_secondary,
        }}>
            <View style={{ flexDirection: 'row', height: 55, alignItems: 'center', paddingHorizontal: 7, justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                <Pressable style={{ height: 55, justifyContent: 'center', paddingHorizontal: 11, flex: 1 }}>
                    <View>
                        <H3 style={{ color: 'black' }}>{name[0].name}</H3>
                    </View>
                </Pressable>
                <Pressable onPress={() => setMore(!more)}>
                    <Animated.View style={{ width: 42, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: `transparent`, borderRadius: 40 }}>
                        <Ionicons name="ios-ellipsis-vertical" size={24} color="black" />
                    </Animated.View>
                </Pressable>

                <Animated.View style={{ position: 'absolute', top: 35, right: 5, width: 220, height: 84, backgroundColor: 'white', zIndex: 10, elevation: 2, borderRadius: 5, display: display }}>
                    <View>
                        <Pressable onPress={handleAjoute} style={{ height: 42, borderBottomColor: '#F0F4FF', borderBottomWidth: 1, paddingHorizontal: 12, justifyContent: 'center' }}>
                            <P>Nouvelle gout</P>
                        </Pressable>
                        <Pressable onPress={() => SupprimerCommade(id)} style={{ height: 42, paddingHorizontal: 12, justifyContent: 'center' }}>
                            <P>Supprimer la Commande</P>
                        </Pressable>
                    </View>
                </Animated.View>
            </View>
            <View style={{ paddingHorizontal : 10, paddingVertical : 5 }}>
                {
                    commandeUser.length > 0 
                    ? <ListeCommandeItems />
                    : (<View style={{ paddingVertical: 16, justifyContent: 'center', alignItems: 'center' }}>
                        <P>Aucune commande</P>
                        <Pressable onPress={handleAjoute} style={{ paddingVertical: 7, paddingHorizontal: 12, backgroundColor: constante.color_primary_10, borderRadius: 5, marginTop: 10 }}>
                            <P style={{ color: constante.color_primary_130 }}>Nouvelle Gout</P>
                        </Pressable>
                    </View>) 
                }
            </View>
        </View>
    )
}


function CommandeItemForUser({ item_name = 'ville', item_price = '650', commandeitemid, item_price_de_gros = '600' }){
    const [nombre, setNombre] = useState(1)
    const [prix, setPrix] = useState()
    const [itemOpen, setItemOpen] = useState(false)

    const { SupprimerCommadeItems } = useGlobalContext()
    
    let NewSolde = nombre * parseInt(item_price)
    let NewGros = nombre * parseInt(item_price)
    
    const HeightValue = useRef(new Animated.Value(48)).current
    const SwitchOn = () => {
        Animated.timing(HeightValue, {
            toValue: 100,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }
    const SwitchOff = () => {
        Animated.timing(HeightValue, {
            toValue: 48,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }

    useEffect(() => {
        itemOpen
        ? SwitchOn()
        : SwitchOff()
    }, [itemOpen])

    const handleValidation = () => {
       setItemOpen(false)
    }

    return(
        <Animated.View style = {{ height : HeightValue, borderColor : constante.color_primary_10, borderWidth : 1, borderRadius : 5 , marginBottom : 5, overflow : 'hidden' }}>
            <Pressable onPress={() => setItemOpen(!itemOpen)} style = {{ height : 48, flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between', paddingHorizontal : 4}}>
                <P style = {{ paddingLeft : 5}}>{item_name}</P>
                <View style={{ height : 38, width: 115 ,borderRadius : 3, backgroundColor : constante.color_primary_10, flexDirection : 'row', alignItems : 'center' }}>
                    <P style={{ width : 38, height : 24, borderRightColor : constante.color_primary_50, borderRightWidth : 1, textAlign : 'center', verticalAlign : 'middle' }}> {nombre} </P>
                    <P style={{ width : 70, height : 24, textAlign : 'right', verticalAlign : 'middle', paddingRight : 5 }}>{NewSolde} F</P>
                </View>
            </Pressable>
            <View style = {{ height : 48, flexDirection : 'row-reverse', alignItems : 'center', justifyContent : 'space-between', paddingHorizontal : 4}}>
                <View style = {{gap : 5, flexDirection : 'row', alignItems : 'center'}}>
                    <Pressable onPress={() => setNombre(nombre - 1)} style = {{ height : 38, width : 38, borderRadius : 5, alignItems : 'center', justifyContent : 'center'}}>
                        <Ionicons name="ios-remove" size={24} color="black" />
                    </Pressable>
                    <Pressable onPress={() => setNombre(nombre + 1)} style = {{ height : 38, width : 38, borderRadius : 5, alignItems : 'center', justifyContent : 'center'}}>
                        <Ionicons name="ios-add" size={24} color="black" />
                    </Pressable>
                </View>
                <View style = {{gap : 5, flexDirection : 'row-reverse', alignItems : 'center'}}>
                    <Pressable onPress = {() => SupprimerCommadeItems(commandeitemid)} style = {{ height : 38, width : 38, borderRadius : 5, alignItems : 'center', justifyContent : 'center'}} >
                        <Ionicons name="ios-trash-outline" size={18} color="black" />
                    </Pressable>
                    <Pressable onPress={handleValidation} style = {{height : 38, gap : 5, flexDirection : 'row', alignItems : 'center', justifyContent : 'center', width : 75, backgroundColor : '#c1ffde', borderRadius : 5 }}>
                        <P>Valid</P>
                        <Ionicons name="checkmark" size={18} color="black" />
                    </Pressable>
                </View>
            </View>
        </Animated.View>
    )
}


type NewUserProp = {
    onPress: () => void,
    value?: string,
    onChange?: (text: string) => void,
    btnState : boolean,
    onClose? : () => void 
}

function NewUser({ onPress, value, onChange, btnState, onClose }: NewUserProp) {

    const { localDb } = useGlobalContext()
    const { localUser } = localDb
    const { user, setUser } = localUser

    const Data = ArrayOf({table : user, number : 7 }).suiteNormal

    return (
        <KeyboardAvoidingView>
            <View style={{ height: 'auto', position: 'absolute', bottom: 0, borderTopColor: constante.color_secondary, borderTopWidth: 1, elevation: 10 }}>
                <View style={{ backgroundColor: 'white', paddingHorizontal : 16, }}>
                    {
                        ListElement(Data, 'name')
                    }
                </View>
                <View style={{ flexDirection: 'row', width: constante.width }}>
                    <TextInput
                        style={{
                            borderColor: 'transparent',
                            height: 56,
                            flex: 1,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            paddingLeft: 16,
                            fontSize: 16
                        }}
                        value={value}
                        onChangeText={onChange}
                        autoFocus={true}
                        placeholder='Nom du Client' 
                    />
                    {
                        btnState 
                        ? (<Pressable onPress={onPress} style={{ height: 56, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                <Ionicons name="ios-checkmark-sharp" size={24} color={constante.color_primary} />
                            </Pressable>)
                        : (<Pressable onPress={onClose} style={{ height: 56, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                                <Ionicons name="close" size={24} color={constante.color_primary} />
                            </Pressable>)
                    }
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

function Item({ name }){
    return(
        <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : "space-between", width : '100%', height : 45}} >
            <P>{name}</P>
        </View>
    )
}

function ListElement(data : [], name : string ){

    const { SetLocalUser,  SetLocalCommande, CreateThatDay, AddUser } = useGlobalContext()
    const { Dlist } = CreateThatDay()
    const { addUser, setAddUser } = AddUser
    
    const element = data && data.map((el, key) => {
        const item = <Item name = {el[name]}  key={key} />
        const line = key < (data.length - 1) && <View style={styles.separator} key={key} /> 

        const handleAdduser = () => {
            const commandeObj = {
                commandeid : generated_ID(),
                date: Dlist.date,
                userId: el.userid,
                dateTimes: Date.now()
            }

            SetLocalUser(el) 
            SetLocalCommande(commandeObj)
            setAddUser(!addUser)
        }


        return (
            <Pressable onPress={handleAdduser} key={key}>
                <View>
                    {item} 
                </View>
                {line}
            </Pressable>
        )
    })

    return element
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constante.backgroundColor,

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 0,
        height: 1,
        width: '100%',
        backgroundColor: constante.color_gray_second,
        opacity : .5
    },

});
