import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Principale_header } from '../components/header';
import { StatusBar } from 'expo-status-bar';
import { Btn_Large } from '../components/bouton';
import constante from '../constants/constante';
import Ongle from '../components/onglet';
import { H2 } from '../components/StyledText';


export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={"dark"}  />
      <Principale_header />
      <View style = {{ flex : 1}}>

      </View>
      <View style = {{height : 210}}>
        <View>
          <H2 style  = {{paddingLeft : 12}}>Menu</H2>
        </View>
      <ScrollView 
        horizontal = {true} 
        contentContainerStyle = {{paddingHorizontal : 16}} 
        showsHorizontalScrollIndicator ={false} 
        style = {{ position : 'relative',left : -16, width : '108.8%' }}
      >
        <View style  = {styles.bottomMenu}>
          <Ongle image={require('../assets/images/S_icon.png')} url='/' titre='Commandes' />
          <Ongle image={require('../assets/images/C_icon.png')} url='/' titre='Dettes' />
          <Ongle image={require('../assets/images/S_O_C_icon.png')} url='/' titre='Stats' />
          <Ongle image={require('../assets/images/Prod_icon.png')} url='/' titre='Fournisseurs' />
        </View>
      </ScrollView>
      </View>
      <Btn_Large url='/modal' text='Calculatrice' style = {styles.btn_large}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding : 16,
    backgroundColor : 'white'
  },
  btn_large : { 
    marginTop : 16, 
    width : constante.width - 32, 
    flexDirection : 'row', 
    justifyContent : 'center'
  },
  bottomMenu : {
    width : '100%',
    flexDirection : 'row',
    gap : 12,
    height : 180,
    alignItems : 'center'
  }
});


