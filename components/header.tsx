import { Link, useRouter } from 'expo-router';
import { StyleSheet, Text, View, Image} from 'react-native';
import constante from '../constants/constante';
import { Btn, Btn_Cercle } from './bouton';
import { H1, H2, H5 } from './StyledText';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export function Principale_header(){
    return(
        <View style = {Style.header}>
            <Btn_Cercle url='/liste'>
                <Ionicons name="md-clipboard" size={24} color="black" />
            </Btn_Cercle>
            <View style = {Style.header_titre}>
                <H1>My Road Shop</H1>
                <H5 style = {Style.header_color_subtitle} >by Lydienne</H5>
            </View>
            <Btn_Cercle url='/modal'>
                <Ionicons name="people" size={24} color="black" />
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
                        <Ionicons name="ios-settings-sharp" size={28} color="black" />
                    </Link>
                </Btn>
                <Btn_Cercle url='/'>
                    <Entypo name="home" size={24} color='black' />
                </Btn_Cercle>
            </View>
        </View>
    )
}

type Header_PageProps = {
    page_name : string
}

export function Header_Page({page_name}: Header_PageProps){
    const router = useRouter()
    return(
        <View style = {Style.Page}>
            <View style  = {Style.Liste_btn}>
                <Btn onPress={() => router.back()}>
                    <Ionicons name="ios-chevron-back-sharp" size={24} color="black" />
                </Btn>
            </View>
            <View style = {Style.header_titre}>
                <H2>{page_name}</H2>
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
                    <Ionicons name="close" size={24} color="black" />
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
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    Liste : {
        width : '100%',
        flexDirection : 'row',
        height :62,
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    Page : {
        width : '100%',
        flexDirection : 'row',
        height :58,
        alignItems : 'center',
        gap : 12
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