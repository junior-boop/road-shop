import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as screen from 'expo-splash-screen';
import {SplashScreen,  Stack } from 'expo-router';
import { useEffect, useCallback } from 'react';
import store from '../gx/store/store'
import GXProvider from '@dilane3/gx'

screen.preventAutoHideAsync()

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);


  useEffect(() =>{
    loaded &&  screen.hideAsync()
  }, [loaded])
  

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen/>}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {

  return (
    <>
      <GXProvider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="liste" options={{ presentation: 'modal', animation : 'slide_from_left', headerShown: false}}  />
          <Stack.Screen name="grilleSet" options={{ presentation: 'modal', animation : 'slide_from_bottom', headerShown : false}}  />
        </Stack>
      </GXProvider>
      
    </>
  );
}
