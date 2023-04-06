import { Link, useRouter } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import constante from '../constants/constante';
import { H3, P } from './StyledText';

type Btn_CercleProps = {
    url? : string ,
    children ?: any,
    text? : string
}

type btnProps = {
    onPress : () => void,
    children : any,
}

type Btn_LargeProps = Btn_CercleProps & Text['props']

export function Btn_Cercle({url, children} : Btn_CercleProps){
    return(
    <Link href={url ? url : '/modal'} style = {{ height : 56, width : 56}}>
        <View style = {Style.cercle}>
            {children}
        </View>
    </Link>
        
    )
}
export function Btn({onPress, children} : btnProps){
    const router = useRouter()
    return(
        <View style = {Style.btn} >
            <Pressable onPress={onPress}>
                {children}
            </Pressable>
        </View>
        
    )
}
export function Btn_Large(props: Btn_LargeProps){
    return(
        <Link href={props.url ? props.url : '/modal'} style = {[props.style, { height : 56}]}>
            <View style = {Style.large}>
                <H3 style = {{ color : 'white'}}>{props.text}</H3>
            </View>
        </Link>
        
    )
}
export function Btn_Normal(props: Btn_LargeProps){
    return(
        <Link href={props.url ? props.url : '/modal'} style = {[props.style, { height : 56}]}>
            <View style = {Style.btn_normal}>
                {props.children}
            </View>
        </Link>
        
    )
}

const Style = StyleSheet.create({
    cercle : {
        width : 56,
        height : 56,
        borderRadius : constante.borderRadius_2,
        backgroundColor : 'white',
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1, 
        borderColor : constante.color_secondary,
    }, 
    large : {
        width : constante.width - 32,
        height : 56,
        borderRadius : constante.borderRadius_2,
        backgroundColor : constante.color_primary,
        alignItems : 'center',
        justifyContent : 'center',
    },
    btn : {
        width : 36,
        height : 36,
        borderRadius : constante.borderRadius_2,
        alignItems : 'center',
        justifyContent : 'center'
    },
    btn_normal : {
        paddingHorizontal : 25,
        height : 36,
        borderRadius : constante.borderRadius_2,
        alignItems : 'center',
        justifyContent : 'center'
    }
})