import { Text } from 'react-native'
import AppLoading from 'expo-app-loading';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import constante from '../constants/constante';
import { SplashScreen } from 'expo-router';

import * as screen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

type TextProps = Text['props']


screen.preventAutoHideAsync()

function useFontSetting(font : any){
  const [element, setElement] = useState<boolean>(false)

  const [fontsLoaded, error] = useFonts({font})

  useEffect(() => {
    fontsLoaded && screen.hideAsync()
    fontsLoaded && setElement(true)
  }, [fontsLoaded])

  useEffect(() => {
    if (error) throw error
  }, [error])

  return element

}

export function H1(props: TextProps) {
  const font = useFontSetting(Montserrat_700Bold)
  const element = !font ? <AppLoading /> : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_700Bold', fontSize : constante.h1, letterSpacing : -1  }]} />
  return element;
}
export function H2(props: TextProps) {
  const font = useFontSetting(Montserrat_600SemiBold)
  const element = !font ? <AppLoading /> : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_600SemiBold', fontSize : constante.h2 }]} />
  return element;
}
export function H3(props: TextProps) {
  const font = useFontSetting(Montserrat_600SemiBold)
  const element = !font ? <AppLoading /> : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_600SemiBold', fontSize : constante.h3 }]} />
  return element;
}
export function H4(props: TextProps) {
  
  const font = useFontSetting(Montserrat_600SemiBold)
  const element = !font ? <AppLoading /> : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_600SemiBold', fontSize : constante.h4 }]} />
  return element;
}
export function H5(props: TextProps) {
  const font = useFontSetting(Montserrat_600SemiBold)
  const element = !font ? <AppLoading /> : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_600SemiBold', fontSize : constante.p_size }]} />
  return element;
}
export function P(props: TextProps) {
  const font = useFontSetting(Montserrat_400Regular)
  const element = !font ? <AppLoading /> : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_400Regular', fontSize : constante.p_size }]} />
  return element;
}
