import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header_Page } from '../../components/header';
import { H3, P } from '../../components/StyledText';
import { useGlobalContext } from '../../context/globalContext';
import constante from '../../constants/constante';
import { Ionicons } from '@expo/vector-icons';


type CommandesItemsProps = {
    titre : string
}

function CommandesItems({ titre }: CommandesItemsProps) {
    const [more, setMore] = useState(false)
    const [display, setDisplay] = useState('none')


    useEffect (() => {
        more 
        ? setDisplay('flex') 
        : setDisplay('none')
    }, [more])


    const handleClose = () => {
        console.log('je foncitonne')
    }
    const handleAjoute = () => {
        console.log('je foncitonne')
    }
    const SupprimerCategorie = () => {
        console.log('je foncitonne')
    }
    return(
        <View>
            <View style = {{
                backgroundColor : 'white', 
                borderRadius : 7, 
                marginBottom : 10,  
                height : 'auto', 
                borderWidth : 1, 
                borderColor : constante.color_secondary
             }}>
                <View style = {{ flexDirection : 'row', height : 55, alignItems : 'center', paddingHorizontal : 7, justifyContent : 'space-between', position : 'relative', zIndex : 2}}>
                    <Pressable style = {{ height : 55, justifyContent : 'center', paddingHorizontal : 11, flex : 1}}>
                        <View>
                            <H3 style = {{ color : 'black'}}>{titre}</H3>
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
                                <P> Ajouter un produit</P>
                            </Pressable>
                            <Pressable onPress={SupprimerCategorie} style = {{height : 42, paddingHorizontal : 12, justifyContent: 'center' }}>
                                <P> Supprimer la Catégorie</P>
                            </Pressable>
                        </View>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}

function CommandesDay(){
    return(
        <View>
            <P>Jeudi 23 Avril</P>
            <CommandesItems titre='Etame' />
        </View>
    )
}

export default function Commandes() {
   
    const {localDb} = useGlobalContext()
    const {localCategories, localItems} = localDb

    const {categories, setCategories} = localCategories
    const { items } = localItems

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style={'dark'} />
        <View style = {{ paddingHorizontal : 16, paddingVertical : 7 }}>
            <Header_Page page_name='Commandes' />
        </View>
        <ScrollView style = {{flex : 1, paddingHorizontal : 16}}>
           <CommandesDay />
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
