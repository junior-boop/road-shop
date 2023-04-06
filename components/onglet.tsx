import { StyleSheet, View, Text, Pressable, Image} from 'react-native'
import { H2, H3 } from './StyledText'
import { Link } from 'expo-router'
import constante from '../constants/constante'


type ongletProps = {
    titre : string,
    image : any,
    url : string
}

export default function Ongle({titre, image, url} : ongletProps){
    return(
        <Link href={url ? url : '/'}>
            <View style = {Style.onglet}>
                <H3>{titre}</H3>
                <View style = {{ position : 'absolute', bottom : -25, right : -20}}>
                    <Image source = {image} style = {{ height : 150, width : 150}} />
                </View>
            </View>
        </Link>
    )
}

const Style = StyleSheet.create({
    onglet : {
        width : 154, 
        height : 154,
        borderRadius : constante.borderRadius,
        backgroundColor : 'white',
        borderWidth : 1, 
        borderColor : constante.color_secondary,
        overflow : 'hidden',
        position : 'relative',
        padding : 12
    }

})