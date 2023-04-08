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


type CommandesItemsProps = {
    name : string, 
    id : string
}


export default function Commandes() {
   
    const {localDb, SetLocalUser, ListProductsModal} = useGlobalContext()
    const {localItems, localUser} = localDb
    const [addUser, setAddUser] = useState(true)
    const [value, setValue] = useState('')

    const { user } = localUser
    const { items } = localItems


    const handleAddUser = () => {
        const users = {
            name : value,
            userid : generated_ID(),
            commandes : []
        }
        setAddUser(!addUser)
        SetLocalUser(users)
        setValue('')
    }

    const Com = ({ Client }) => {
        return(
            <>
                <View style = {{paddingVertical : 12}}>
                    <Display>Jeudi 23 Avril</Display>
                </View>
                {
                    Client && Client.map(( el:any, key:number) => <CommandesItems name={el.name} id = {el.userid} key = {key} />)
                }
                <View style = {{marginBottom : 24, position : "relative"}} />
            </>
        )
    }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style={'dark'} />
        <View style = {{ paddingHorizontal : 16, paddingVertical : 7 }}>
            <Header_Page page_name='Commandes' />
        </View>
        <ScrollView style = {{flex : 1, paddingHorizontal : 16}}>
             <Com Client={user}/>
        </ScrollView>
        {
            addUser 
            ? (<Pressable onPress = {() => setAddUser(!addUser)} style = {{position : 'absolute', bottom : 18, right : 18, width : 62, aspectRatio : 1, alignItems : 'center', justifyContent : 'center', borderRadius : 50, elevation : 5, backgroundColor : constante.color_primary }}>
                    <Ionicons name="md-person-add" size={24} color="white" />
                </Pressable>)
            : (<NewUser 
                onPress={handleAddUser} 
                value={value}
                onChange={setValue}
            />)
        }
        <ModalCommande />
    </SafeAreaView>
  );
}

function ModalCommande(){

    const {localDb, ListProductsModal} = useGlobalContext()
    const {localItems, localUser} = localDb
    const { user } = localUser
    const { items } = localItems



    const { listProductModal, setListProductModal } = ListProductsModal
    const [clientName, setClientName] = useState('')

    const HeightValue = useRef(new Animated.Value(0)).current
    const SwitchOn = () => {
        Animated.timing(HeightValue, {
            toValue : 700,
            duration : 300,
            useNativeDriver : false,
        }).start()
    }
    const SwitchOff = () => {
        Animated.timing(HeightValue, {
            toValue : 0,
            duration : 300,
            useNativeDriver : false,
        }).start()
    }

    useEffect(() => {
        listProductModal.state
        ? SwitchOn()
        : SwitchOff()

        const userSelect = user && user.filter((el : any) => el.userid === listProductModal.userid)
        

        if(userSelect.length !== 0){
            setClientName(userSelect[0].name)
        }
        
    }, [listProductModal])

    const CloseBtn = () => {
        setListProductModal((prev:any) => ({...prev, state : false}))
    }

    return(
        <Animated.View style = {{ position : 'absolute', bottom : 0, width : constante.width, left : 0, height : HeightValue, backgroundColor : 'white', elevation : 10}}>
            
            <View style = {{ flexDirection : 'row', marginHorizontal : 16, paddingVertical : 12, alignItems : 'center', justifyContent : 'space-between' }}  >
                <View>
                    <P>Commande pour</P>
                    <H2>{clientName}</H2>
                </View>
                <Pressable onPress={CloseBtn} style = {{ width : 36, height : 36 , alignItems : 'center', justifyContent : 'center', borderRadius : 24, backgroundColor : constante.color_secondary }}>
                    <Ionicons name="close" size={24} color="black" />
                </Pressable>
            </View>
            <ScrollView style = {{ flex : 1, paddingHorizontal : 16, paddingTop : 12}}>
                {
                    items && items.map( (el:any, key : number) => (
                        <Pressable key = {key} style = {{ flexDirection : 'row', justifyContent : 'space-between', paddingVertical : 10, paddingHorizontal : 12, backgroundColor : constante.color_secondary, marginBottom : 5, borderRadius : 5}}>
                            <P>{el.item_name}</P>
                            <P>{el.item_price} XAF</P>
                        </Pressable>))
                }
            </ScrollView>
        </Animated.View>
    )
}

function CommandesItems({ name, id }: CommandesItemsProps) {
    const [more, setMore] = useState(false)
    const [display, setDisplay] = useState('none')
    
    const { SupprimerUser, ListProductsModal } = useGlobalContext()

    const { listProductModal, setListProductModal } = ListProductsModal

    useEffect (() => {
        more 
        ? setDisplay('flex') 
        : setDisplay('none')
    }, [more])

    const handleAjoute = () => {
        setListProductModal({state : true, userid : id})
    }




    return(
            <View style = {{
                backgroundColor : 'white', 
                borderRadius : 7, 
                marginBottom : 10,  
                height : 'auto', 
                borderWidth : 1, 
                borderColor : constante.color_secondary, 
             }}>
                <View style = {{ flexDirection : 'row', height : 55, alignItems : 'center', paddingHorizontal : 7, justifyContent : 'space-between', position : 'relative', zIndex : 2}}>
                    <Pressable style = {{ height : 55, justifyContent : 'center', paddingHorizontal : 11, flex : 1}}>
                        <View>
                            <H3 style = {{ color : 'black'}}>{name}</H3>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => setMore(!more)}>
                        <Animated.View style = {{width : 42, height : 42, alignItems : 'center', justifyContent : 'center', backgroundColor : `transparent`, borderRadius : 40}}>
                            <Ionicons name="ios-ellipsis-vertical" size={24} color="black" />
                        </Animated.View>
                    </Pressable> 
                    
                    <Animated.View style = {{position : 'absolute', top : 35, right : 5, width : 220, height : 84, backgroundColor : 'white', zIndex : 10, elevation : 2,borderRadius : 5, display : display }}>
                        <View>
                            <Pressable onPress={handleAjoute} style = {{height : 42, borderBottomColor : '#F0F4FF', borderBottomWidth : 1, paddingHorizontal : 12, justifyContent: 'center'  }}>
                                <P>Nouvelle gout</P>
                            </Pressable>
                            <Pressable onPress={() => SupprimerUser(id)} style = {{height : 42, paddingHorizontal : 12, justifyContent: 'center' }}>
                                <P>Supprimer la Commande</P>
                            </Pressable>
                        </View>
                    </Animated.View>
                </View>
                <View>
                    <View style = {{paddingVertical : 16, justifyContent : 'center', alignItems :'center' }}>
                        <P>Aucune commande</P>
                        <Pressable onPress={handleAjoute} style = {{ paddingVertical : 7, paddingHorizontal : 12, backgroundColor : constante.color_primary_10, borderRadius : 5, marginTop : 10}}>
                            <P style = {{ color : constante.color_primary_130 }}>Nouvelle Gout</P>
                        </Pressable>
                    </View>
                </View>
            </View>
    )
}

type NewUserProp = {
    onPress : () => void, 
    value? : string,
    onChange? : (text:string) => void
}

function NewUser({onPress, value, onChange} : NewUserProp) {

    const {localDb} = useGlobalContext()
    const {localUser} = localDb
    const { user, setUser} = localUser


    return(
            <KeyboardAvoidingView>
                <View style = {{ height : 'auto', position : 'absolute', bottom : 0, borderTopColor : constante.color_secondary, borderTopWidth : 1, elevation : 10}}>
                    <View style = {{backgroundColor : 'white'}}>
                        <P>Bonjour</P>
                    </View>
                        <View style = {{flexDirection : 'row', width : constante.width}}>
                            <TextInput 
                                style = {{
                                    borderColor : 'transparent', 
                                    height : 56, 
                                    flex : 1, 
                                    backgroundColor : 'white', 
                                    justifyContent : 'center',
                                    paddingLeft : 16,
                                    fontSize : 16
                                }} 
                                value={value}
                                onChangeText={onChange}
                                autoFocus ={true} 
                                placeholder='Nom du Client'/>
                            <Pressable onPress = {onPress} style = {{height : 56, aspectRatio : 1, alignItems : 'center', justifyContent : 'center', backgroundColor : 'white'}}>
                                <Ionicons name="ios-checkmark-sharp" size={24} color={constante.color_primary} />
                            </Pressable>
                        </View>
                </View>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : constante.backgroundColor,
   
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 0,
    height: 1,
    width: '100%',
    backgroundColor : constante.color_gray_second
  },

});
