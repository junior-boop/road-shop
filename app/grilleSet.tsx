import {View, StyleSheet, Text, KeyboardAvoidingView,ScrollView, TextInput, Image, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Grille_Set_header } from '../components/header';
import { Btn } from '../components/bouton';
import constante from '../constants/constante';
import { useEffect, useState } from 'react';
import { useAction, useSignal } from '@dilane3/gx';


import { P } from '../components/StyledText';
import { Feather } from '@expo/vector-icons';


export default function ParametreGrille(){

    const [categories, setCategorie] = useState<string>('');
    const [data, setData] = useState<any>([])
    const [new_data, setnew_Data] = useState<string>('')

    const categorie  =  useSignal('categorie')
    const { create } = useAction('categorie')

    const handleAdd = (payload : any) => {

        const obj = {
            categorie_name : payload,
            categorie_id : 1
        }
        create(obj)
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
                        value = {categorie}
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
                
                    <View>
                        { data.map((el, key) => <CategorieSet titre = {el.categorie_name} key={key} />) }
                    </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}


type CategorieSetProps = {
    titre : string,
    modify? : () => void,
    delete? : () => void
}

function CategorieSet({titre} : CategorieSetProps){
    return(
        <View style = {{backgroundColor : 'silver', borderWidth : 1, borderColor : 'black'}}>
            <View>
                <Pressable>
                    <View>
                        <P>{titre}</P>
                    </View>
                </Pressable>
                <View>
                    <Feather name="more-vertical" size={24} color="black" />
                </View>
            </View>
            <View></View>
        </View>
    )
}