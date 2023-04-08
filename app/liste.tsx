import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Liste_header } from '../components/header';
import constante from '../constants/constante';
import { H2, H3, P } from '../components/StyledText';
import { useGlobalContext } from '../context/globalContext';


type ItemProps = {
    name : string;
    prix : number,
}


function Item({name, prix}:ItemProps){
    return(
        <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : "space-between", width : '100%', height : 45, opacity : .6}} >
            <H3 style = {{color : 'black'}}>{name}</H3>
            <H3>{prix} XAF</H3>
        </View>
    )
}

function ListElement( data: any, name : string, prix_vente : string ){
    const element = data && data.map((el : any, key : number) => {
        const item = <Item name = {el.item_name} prix={el.item_price} key={key} />
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

type CategorieSetProps = {
    titre : string,
    id : string,
    item : any
}

function Categorie({titre, id, item}: CategorieSetProps){
    const [element, setElement] = useState<any[]>([])
    
    useEffect(() => {
        const filter =item && item.filter((el:any) => el.categorie_id === id)
        setElement(filter)
    }, [item])


    useEffect(() => {
        const filter =item && item.filter((el:any) => el.categorie_id === id)
        setElement(filter)
    }, [])

    return(
        <>
            <H2 style = {{ paddingLeft : 12, marginBottom : 12}}>{titre}</H2>
            <View style = {{
                paddingHorizontal : 18,
                paddingVertical : 7,
                borderWidth : 1, 
                borderColor : constante.color_secondary,
                borderRadius : constante.borderRadius,
                backgroundColor : 'white',
                marginBottom : 12
            }}>
                {
                    ListElement(element, 'item_name', 'item_price')
                }
            </View>
        </>
    )
}


export default function Liste() {
   
    const {localDb} = useGlobalContext()
    const {localCategories, localItems} = localDb

    const {categories, setCategories} = localCategories
    const { items } = localItems

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style={'dark'} />
        <View style = {{ paddingHorizontal : 16, paddingVertical : 7 }}>
            <Liste_header />
        </View>
        <ScrollView style = {{flex : 1, paddingHorizontal : 16}}>
            {
               categories && categories.map((el:any, key : number) => <Categorie titre= {el.categorie_name} id= {el.categorie_id} item={items} key={key} />)
            } 
        </ScrollView>
    </SafeAreaView>
  );
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
