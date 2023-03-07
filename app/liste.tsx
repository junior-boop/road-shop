import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Liste_header } from '../components/header';
import constante from '../constants/constante';
import { H2, H3 } from '../components/StyledText';



const Bierre = [
    {
        name : 'Mutzik',
        prix_unitaire : 600,
        prix_vente : 650
    },
    {
        name : 'Orijin',
        prix_unitaire : 600,
        prix_vente : 750
    },
    {
        name : '33 Export',
        prix_unitaire : 600,
        prix_vente : 650
    },
    {
        name : 'Castel',
        prix_unitaire : 600,
        prix_vente : 650
    },
    {
        name : 'Kadji',
        prix_unitaire : 600,
        prix_vente : 650
    },
    {
        name : 'Manyan',
        prix_unitaire : 450,
        prix_vente : 500
    },
    {
        name : 'Isenbeck',
        prix_unitaire : 681,
        prix_vente : 750
    },
    {
        name : 'Chill',
        prix_unitaire : 450,
        prix_vente : 500
    },
]


type ItemProps = {
    name : string;
    prix : number,
}


function Item({name, prix}:ItemProps){
    return(
        <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : "space-between", width : '100%', height : 55, opacity : .6}} >
            <H3>{name}</H3>
            <H3>{prix} XAF</H3>
        </View>
    )
}

function ListElement(){
    const element = Bierre.map((el, key) => {
        const item = <Item name = {el.name} prix={el.prix_vente} key={key} />
        const line = key < (Bierre.length - 1) && <View style={styles.separator} key={key} /> 
        
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


export default function Liste() {
   

    console.log()

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style={'dark'} />
        <Liste_header />
        <H2 style = {{ paddingLeft : 12, marginBottom : 12}}>Bierres</H2>
        <View style = {{
            padding : 18,
            borderRadius : constante.borderRadius,
            backgroundColor : constante.color_secondary
        }}>
            {
                ListElement()
            }
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white',
    padding : 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 0,
    height: 1,
    width: '100%',
    backgroundColor : constante.color_gray
  },

});
