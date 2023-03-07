import { Link, useRouter } from 'expo-router';
import { StyleSheet, Text, View, Image} from 'react-native';
import constante from '../constants/constante';
import { Btn, Btn_Cercle } from './bouton';
import { H1, H2, H5 } from './StyledText';

export function Principale_header(){
    return(
        <View style = {Style.header}>
            <Btn_Cercle url='/liste'>
                <Image source={require('../assets/images/P_M_icon.png')} />
            </Btn_Cercle>
            <View style = {Style.header_titre}>
                <H1>My Road Shop</H1>
                <H5 style = {Style.header_color_subtitle} >by Lydienne</H5>
            </View>
            <Btn_Cercle url='/modal'>
                <Image source={require('../assets/images/T_icon.png')} />
            </Btn_Cercle>
        </View>
    )
}
export function Liste_header(){
   
    return(
        <View style = {Style.Liste}>
            <View style = {Style.header_titre}>
                <H1>Grille des Prix</H1>
            </View>
            <View style  = {Style.Liste_btn}>
                <Btn onPress={() => console.log('')}>
                    <Link href={'/grilleSet'} style = {{ height : 24, width : 24}}>
                        <View style = {{ height : 24, width : 24}}>
                            <Image  source={require('../assets/images/Set_icon.png')} />
                        </View>
                    </Link>
                </Btn>
                <Btn_Cercle url='/'>
                    <Image source={require('../assets/images/H_icon.png')} />
                </Btn_Cercle>
            </View>
        </View>
    )
}
export function Grille_Set_header(){
    const router = useRouter()
    return(
        <View style = {Style.Liste}>
            <View style = {Style.header_titre}>
                <H1>Gestion des prix </H1>
            </View>
            <View style  = {Style.Liste_btn}>
                <Btn onPress={() => router.back()}>
                    <Image style = {{ height : 18, width : 18}} source={require('../assets/images/Close_icon.png')} /> 
                </Btn>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    header : {
        width : '100%',
        flexDirection : 'row',
        height :72,
        paddingHorizontal : 12,
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    Liste : {
        width : '100%',
        flexDirection : 'row',
        height :72,
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    header_titre : {
        width : 'auto',
        alignItems : 'center'
    },

    header_color_subtitle : {
        color : constante.color_gray
    },
    Liste_btn : {
        flexDirection : 'row',
        alignItems : 'center',
        gap : 12
    }
})