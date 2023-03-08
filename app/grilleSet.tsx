import {View, StyleSheet, Text, KeyboardAvoidingView,ScrollView, TextInput, Image, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Grille_Set_header } from '../components/header';
import { Btn } from '../components/bouton';
import constante from '../constants/constante';
import { useEffect, useState } from 'react';
import { useSignal, useAction } from '@dilane3/gx'
import * as SQLite from 'expo-sqlite'
import { P } from '../components/StyledText';

import { Feather } from '@expo/vector-icons';


export default function ParametreGrille(){
    const db = SQLite.openDatabase('database.db')

    const [categorie, setCategorie] = useState('');
    const [data, setData] = useState<any>([])
    const [new_data, setnew_Data] = useState<any>([])

    

    
    const categories = useSignal('categorie')

    useEffect(() => {
        db.transaction( tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS categories (categorie_id INTEGER PRIMARY KEY AUTOINCREMENT, categorie_name TEXT NOT NULL)')
        } )

        db.transaction( tx => {
            tx.executeSql('SELECT * FROM categories', [], 
                (obj, resultSet) => {
                    setData(resultSet.rows._array)
                }
            )
        })

        
    }, [data])


    const handleAdd = (payload : any) => {
        console.log('je fonctionne')
        db.transaction( tx => {
            tx.executeSql('INSERT INTO categories (categorie_name) values (?)', [payload], 
              (obj, resultSet) => {console.log(resultSet.rows._array)})
        });
        setCategorie('')
    }


    const handleDelete = (id : any) => {
        db.transaction( tx => {
            tx.executeSql('DELETE FROM categories WHERE categorie_id = ?', [id], 
              (obj, resultSet) => {console.log(resultSet.rows._array)})
        });
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
                        <Btn onPress={() => handleAdd(categorie)}>
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
    modify : () => void,
    delete : () => void
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