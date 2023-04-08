import { Text } from 'react-native'
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_200ExtraLight } from '@expo-google-fonts/montserrat';
import constante from '../constants/constante';


type TextProps = Text['props']


export function H1(props: TextProps) {
  const [fontsLoaded] = useFonts({Montserrat_700Bold})
  const element = !fontsLoaded ? null : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_700Bold', fontSize : constante.h1, letterSpacing : -1  }]} />
  return element;
}
export function H2(props: TextProps) {
  const [fontsLoaded] = useFonts({Montserrat_600SemiBold})
  const element = !fontsLoaded ? null : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_600SemiBold', fontSize : constante.h2 }]} />
  return element;
}
export function H3(props: TextProps) {
  const [fontsLoaded] = useFonts({Montserrat_600SemiBold})
  const element = !fontsLoaded ? null : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_600SemiBold', fontSize : constante.h3 }]} />
  return element;
}
export function H4(props: TextProps) {
  
  const [fontsLoaded] = useFonts({Montserrat_600SemiBold})
  const element = !fontsLoaded ? null : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_600SemiBold', fontSize : constante.h4 }]} />
  return element;
}
export function H5(props: TextProps) {
  const [fontsLoaded] = useFonts({Montserrat_600SemiBold})
  const element = !fontsLoaded ? null : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_600SemiBold', fontSize : constante.p_size }]} />
  return element;
}
export function P(props: TextProps) {
  const [fontsLoaded] = useFonts({Montserrat_400Regular})
  const element = !fontsLoaded ? null : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_400Regular', fontSize : constante.p_size }]} />
  return element;
}
export function Display(props: TextProps) {
  const [fontsLoaded] = useFonts({Montserrat_200ExtraLight})
  const element = !fontsLoaded ? null : <Text {...props} style={[props.style, { fontFamily: 'Montserrat_200ExtraLight', fontSize : 36 }]} />
  return element;
}
