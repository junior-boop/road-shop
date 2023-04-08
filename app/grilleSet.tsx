import {View, StyleSheet, Text, KeyboardAvoidingView,ScrollView, TextInput, Image, Pressable, Animated} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Grille_Set_header } from '../components/header';
import { Btn } from '../components/bouton';
import constante from '../constants/constante';
import {  useEffect, useRef, useState } from 'react';


import { H3, P } from '../components/StyledText';
import { Feather, Ionicons } from '@expo/vector-icons';
import generated_ID from '../constants/id_gen';
import { useGlobalContext } from '../context/globalContext';


export default function ParametreGrille(){
    const [value, setValue] = useState('')
    const [Cat, setCat] = useState([])
    const {localDb, SetCategoriesDB} = useGlobalContext()
    const {localCategories} = localDb

    const {categories, setCategories} = localCategories

    

    const handleAddNewCategorie = async () => {
        const obj = {
            categorie_id: generated_ID(),        
            categorie_name: value,        
          }
        if(value !== "" && value.length !== 0) {
            setCategories((el:any) => [...el, obj])
            await SetCategoriesDB(obj)
            setValue('')
        }
    }

    useEffect(() => {
        setCat(categories)
    }, [categories])

    useEffect(() => {
        setCat(categories)
    }, [])

    return(
        <SafeAreaView style = {{ flex : 1, backgroundColor : '#F5F5F5' }}>
            <View style  = {{paddingHorizontal : 16}}>
                <Grille_Set_header />
            </View>
            <ScrollView style = {{ paddingHorizontal : 16, paddingTop : 12 }}>
                <View style  = {{ flexDirection : 'row', alignItems : 'center', gap : 7}}>
                    <View 
                    style  = {{
                        flex : 1,
                        borderRadius : constante.borderRadius_2
                        }}>
                        <TextInput style = {{
                            borderRadius : constante.borderRadius_2,
                            borderWidth : 1, 
                            borderColor : constante.color_secondary,
                            backgroundColor : 'white',
                            height : 42,
                            paddingHorizontal : 16,
                            fontSize : constante.p_size
                        }} 
                        placeholder='Votre categorie' 
                        value={value}
                        onChangeText={setValue}
                    />
                    </View>
                    <View style = {{
                        width : 42,
                        height : 42,
                        justifyContent : 'center',
                        alignItems : 'center'
                    }} >
                        <Btn onPress={handleAddNewCategorie}>
                            <Ionicons name="add-circle" size={30} color={constante.color_primary} />
                        </Btn>
                    </View>
                </View>
                    <View style = {{ paddingVertical : 16,  }}>
                        { Cat && Cat.map((el:any, key:number) => <CategorieSet id = {el.categorie_id} titre = {el.categorie_name} key={key} />) }
                    </View>
                    <View style  = {{height : 100}} />
            </ScrollView>
        </SafeAreaView>
    )
}






type CategorieSetProps = {
    titre : string,
    id : string,
    modify? : () => void,
    delete? : () => void
}

function CategorieSet({titre, id} : CategorieSetProps){
    const [value, setValue] = useState('')
    const [prix_gros, setPrixGros] = useState('')
    const [prix, setPrix] = useState('')
    const [element, setElement] = useState<object[]>([])

    // Evenement 
    const [more, setMore] = useState(false)
    const [display, setDisplay] = useState('none')
    const [ajout, setAjout] = useState(false)

    const {localDb, SetItemsDB, SupprimerCategorie} = useGlobalContext()
    const { localItems } = localDb
    const { items, setItems} = localItems

    const handleAddNewElement = async () => {
        const obj = {
            categorie_id: id,        
            "item_id": generated_ID(),
            "item_name": value,    
            "item_price_de_gros": prix_gros,        
            "item_price": prix,        
          }
        if(value !== "" && value.length !== 0) {
            setItems((el:any) => [...el, obj])
            await SetItemsDB(obj)

            setValue('')
            setPrix('')
            setPrixGros('')
        }
    }
    
    
    useEffect(() => {
        const filter =items && items.filter((el:any) => el.categorie_id === id)
        setElement(filter)
    }, [items])


    useEffect(() => {
        const filter =items && items.filter((el:any) => el.categorie_id === id)
        setElement(filter)
    }, [])

    
    useEffect(() => {
        if(more){
            setDisplay('flex')
        } else {
            setDisplay('none')
        }
    }, [more])




    const ZoneAjout = useRef(new Animated.Value(0)).current

    const OpenZoneAjout = () =>{
        Animated.timing(ZoneAjout, {
            toValue : 84,
            duration : 300,
            useNativeDriver : false
        }).start();
    }
    const CloseZoneAjout = () =>{
        Animated.timing(ZoneAjout, {
            toValue : 0,
            duration : 300,
            useNativeDriver : false
        }).start()
    }

    const handleAjoute = () => {
        OpenZoneAjout()
        setMore(false)
        setAjout(true)
    }
    const handleClose = () => {
        CloseZoneAjout()
        setAjout(false)
        setValue('')
        setPrix('')
        setPrixGros('')
    }


    const ListeElement = () => {
        return element.length !== 0
        ? (
            <View style  = {{ paddingHorizontal : 16}}>
                {
                    ListElement(element, 'item_name', 'item_price') 
                }
            </View>
        )
        : ( <View style = {{ height : 45, width : '100%', alignItems : 'center', justifyContent : 'center'}}>
                <Text>Aucune element</Text>
            </View>)
    }


    return(
        <View style = {{
            backgroundColor : 'white', 
            borderRadius : 7, 
            marginBottom : 10,  
            height : 'auto', 
            borderWidth : 1, 
            borderColor : constante.color_secondary 
            }}>
            <View style = {{ flexDirection : 'row', height : 55, alignItems : 'center', paddingHorizontal : 7, justifyContent : 'space-between', position : 'relative', zIndex : 10}}>
                <Pressable style = {{ height : 55, justifyContent : 'center', paddingHorizontal : 11, flex : 1}}>
                    <View>
                        <H3 style = {{ color : '#004CFF'}}>{titre}</H3>
                    </View>
                </Pressable>
                {
                    ajout 
                    ? (<Animated.View style = {{ width : 32, aspectRatio : 1, marginRight : 5}}>
                            <Pressable onPress={handleClose} style = {{ padding : 3.5, backgroundColor : '#FF0055',  borderRadius : 50, }}>
                                <Ionicons name='close' size={24} color={'white'}/>
                            </Pressable>
                        </Animated.View>)
                    : (
                        <Pressable onPress={() => setMore(!more)}>
                            <Animated.View style = {{width : 42, height : 42, alignItems : 'center', justifyContent : 'center', backgroundColor : `transparent`, borderRadius : 40}}>
                                <Feather name="more-vertical" size={24} color="black" />
                            </Animated.View>
                        </Pressable>
                    )
                }
                
                
                <Animated.View style = {{position : 'absolute', top : 35, right : 5, width : 220, height : 84, backgroundColor : 'white', zIndex : 10, elevation : 2,borderRadius : 5, display : display }}>
                    <View>
                        <Pressable onPress={handleAjoute} style = {{height : 42, borderBottomColor : '#F0F4FF', borderBottomWidth : 1, paddingHorizontal : 12, justifyContent: 'center'  }}>
                            <P> Ajouter un produit</P>
                        </Pressable>
                        <Pressable onPress={() => SupprimerCategorie(id)} style = {{height : 42, paddingHorizontal : 12, justifyContent: 'center'  }}>
                            <P> Supprimer la Catégorie</P>
                        </Pressable>
                    </View>
                </Animated.View>
            </View>
            <Animated.View>
                <Animated.View style  = {{ flexDirection : 'row', alignItems : 'center', gap : 7, paddingRight : 7,  backgroundColor : constante.color_primary_10, zIndex : 5, position : 'relative', height : ZoneAjout, overflow : 'hidden'}}>
                    <View style = {{ flex : 1}}>
                    <View 
                        style  = {{
                            flex : 1,
                            borderRadius : constante.borderRadius_2, 
                        }}>
                        <TextInput style = {{
                            height : 42,
                            paddingHorizontal : 16,
                            fontSize : constante.p_size,
                            width : '100%'
                        }} 
                        placeholder='Ajouter un Element' 
                        placeholderTextColor={'black'}
                        value={value}
                        onChangeText={setValue}
                        />
                    </View>
                    <View style = {{ flexDirection : 'row'}}>
                    <View 
                        style  = {{
                            flex : 1, backgroundColor : '#2221'
                        }}>
                        <TextInput 
                            style = {{
                                height : 42,
                                paddingHorizontal : 16,
                                fontSize : constante.p_size
                            }} 
                            placeholder='Prix de gros' 
                            value={prix_gros}
                            onChangeText={setPrixGros}
                            placeholderTextColor={'black'}
                            inputMode='numeric'
                            keyboardType='numbers-and-punctuation'
                        /> 
                        
                    </View>
                    <View 
                        style  = {{
                            flex : 1, 
                            backgroundColor : '#2221',
                            borderLeftColor : '#004CFF',
                            borderLeftWidth : 1
                        }}>
                        <TextInput 
                            style = {{
                                height : 42,
                                paddingHorizontal : 16,
                                fontSize : constante.p_size
                            }} 
                            placeholder='Prix' 
                            value={prix}
                            contextMenuHidden = {false}
                            inputMode='numeric'
                            keyboardType='numbers-and-punctuation'
                            onChangeText={setPrix}
                            placeholderTextColor={'black'}
                        /> 
                        
                    </View>
                    </View>
                    </View>
                    <View style = {{
                        width : 42,
                        height : 42,
                        justifyContent : 'center',
                        alignItems : 'center'
                    }} >
                        <Btn onPress={handleAddNewElement}>
                            <Image source={require('../assets/images/D_icon.png')} />
                        </Btn>
                    </View>
                </Animated.View>
                <View>
                        {
                            element &&
                            ListeElement()
                        }
                </View>
            </Animated.View>
        </View>
    )
}

type ItemProps = {
    name : string;
    prix : number,
}

function Item({name, prix}:ItemProps){
    return(
        <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : "space-between", width : '100%', height : 45, opacity : .6}} >
            <P>{name}</P>
            <P>{prix} XAF</P>
        </View>
    )
}


function ListElement(data : [], name : string, prix : string){
    const element =data && data.map((el, key) => {
        const item = <Item name = {el[name]} prix={el[prix]} key={key} />
        const line = key < (data.length - 1) && <View style={styles.separator} key={key} /> 
        
        return (
            <View key={key}>
                <View>
                    {item} 
                </View>
                {line}
            </View>
        )
    })

    return element
}


const styles = StyleSheet.create({
    
    separator: {
      marginVertical: 0,
      height: 1,
      width: '100%',
      backgroundColor : constante.color_gray_second
    },
  
  });