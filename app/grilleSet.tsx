import {View, StyleSheet, Text, KeyboardAvoidingView,ScrollView, TextInput, Image, Pressable, Animated} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Grille_Set_header } from '../components/header';
import { Btn } from '../components/bouton';
import constante from '../constants/constante';
import { useEffect, useRef, useState } from 'react';
import { useAction, useSignal } from '@dilane3/gx';


import { P } from '../components/StyledText';
import { Feather } from '@expo/vector-icons';
import generated_ID from '../constants/id_gen';


export default function ParametreGrille(){
    const [state, setState] = useState('')
    const [count, setCounter] = useState(0)


    const [categories, setCategorie] = useState<string>('');
    const [data, setData] = useState<any>([])

    const categorie  =  useSignal('categorie')
    const { create } = useAction('categorie')


    const text = async () => {
        const v = await categorie
        console.log(v)
        setState(v)
    }

    useEffect(() => {
        text()
        state !== '' ? setData(state) : console.log('rien')
       
    }, [state, count])


    const handleAdd = (payload : any) => {
        
        const obj = {
            categorie_name : payload,
            categorie_id : generated_ID()
        }

        create(obj)
        setCounter(count + 1)
        setCategorie('')
    }


    const handleDelete = (id : any) => {

    }

    return(
        <SafeAreaView style = {{ flex : 1, backgroundColor : 'white' }}>
            <View style  = {{paddingHorizontal : 16}}>
                <Grille_Set_header />
            </View>
            <ScrollView style = {{ paddingHorizontal : 16 }}>
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
                            backgroundColor : constante.color_secondary,
                            height : 42,
                            paddingHorizontal : 16,
                            fontSize : constante.p_size
                        }} 
                        placeholder='votre categorie' 
                        value = {categories}
                        onChangeText={setCategorie}
                    />
                    </View>
                    <View style = {{
                        width : 42,
                        height : 42,
                        justifyContent : 'center',
                        alignItems : 'center'
                    }} >
                        <Btn onPress={() => handleAdd(categories)}>
                            <Image source={require('../assets/images/P_icon.png')} />
                        </Btn>
                    </View>
                </View>

                    
                
                    <View style = {{ paddingVertical : 16,  }}>
                        { data.map((el, key) => <CategorieSet id = {el.categorie_id} titre = {el.categorie_name} key={key} />) }
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
    const [items, setItems] = useState('')
    const [prix, setPrix] = useState('')
    const [state, setState] = useState('')
    const [data, setData] = useState('')
    const [count, setCounter] = useState(0)
    const ColorAnimated = useRef(new Animated.Value(0)).current

    const visible = () => {
        Animated.timing(ColorAnimated, {
            toValue : 9, 
            duration : 500,
            delay : 100 ,
            useNativeDriver : true
        }).start()

    }

    const categorie  =  useSignal('categorie')
    const { save_item } = useAction('categorie')

    const text = async () => {
        const v = await categorie
        console.log(v)
        setState(v)
    }

    useEffect(() => {
        text()
        state !== '' ? setData(state) : console.log('rien')
       
    }, [state, count])

    type ItemsProps = {
        item_name : string, 
        item_price : string, 
        categorie_id : string
    }

    const handleAdd = ({item_name, item_price, categorie_id}: ItemsProps) => {
        let obj =  {
            item_name, 
            item_price,
            categorie_id, 
            item_id : generated_ID()
        }

        save_item(obj)
        setCounter(count + 1)
        setItems('')
        setPrix('')
        
    }



    return(
        <View style = {{backgroundColor : '#f3f3f3', borderRadius : 27, marginBottom : 5, overflow : 'hidden', height : 'auto', }}>
            <View style = {{ flexDirection : 'row', height : 55, alignItems : 'center', paddingHorizontal : 7, justifyContent : 'space-between'}}>
                <Pressable style = {{ height : 55, justifyContent : 'center', paddingHorizontal : 11, flex : 1}}>
                    <View>
                        <P>{titre}</P>
                    </View>
                </Pressable>
                <Pressable onPress={() => visible()}>
                    <Animated.View style = {{width : 42, height : 42, alignItems : 'center', justifyContent : 'center', backgroundColor : `transparent`, borderRadius : 40}}>
                        <Feather name="more-vertical" size={24} color="black" />
                    </Animated.View>
                </Pressable>
            </View>
            <Animated.View>
                <View style  = {{ flexDirection : 'row', alignItems : 'center', gap : 7, paddingRight : 7,  backgroundColor : '#f9f9f9'}}>
                    <View 
                        style  = {{
                            flex : 1,
                            borderRadius : constante.borderRadius_2, 
                        
                        }}>
                        <TextInput style = {{
                            borderRadius : constante.borderRadius_2,
                            borderWidth : 1, 
                            borderColor : constante.color_secondary,
                            height : 42,
                            paddingHorizontal : 16,
                            fontSize : constante.p_size
                        }} 
                        placeholder='Ajouter un Element' 
                        value = {items}
                        onChangeText={setItems}
                        />
                    </View>
                    <View 
                        style  = {{
                            width : 72,
                            borderRadius : constante.borderRadius_2, 
                        
                        }}>
                        <TextInput style = {{
                            borderRadius : constante.borderRadius_2,
                            borderWidth : 1, 
                            borderColor : constante.color_secondary,
                            height : 42,
                            paddingHorizontal : 16,
                            fontSize : constante.p_size
                        }} 
                        placeholder='Prix' 
                        />
                    </View>
                    <View style = {{
                        width : 42,
                        height : 42,
                        justifyContent : 'center',
                        alignItems : 'center'
                    }} >
                        <Btn onPress={() => handleAdd({
                            item_name : items,
                            item_price : prix,
                            categorie_id : id
                        })}>
                            <Image source={require('../assets/images/D_icon.png')} />
                        </Btn>
                    </View>
                </View>
                <View style = {{ height : 45, width : '100%', alignItems : 'center', justifyContent : 'center'}}>
                    <Text>Aucune element</Text>
                </View>
            </Animated.View>
        </View>
    )
}