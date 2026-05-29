import 'react-native-gesture-handler'; // <-- Important
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import 'react-native-reanimated';

// Enable native screen optimizations
enableScreens();

import HomeScreen from './src/screens/HomeScreen';
import ParaIndex from './src/screens/ParaIndex';
import QuranViewer from './src/screens/QuranViewer';
import SurahIndex from './src/screens/SurahIndex';
import Setings from "./src/screens/Settings"
//import Settings from './src/screens/Settings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ParaIndex" component={ParaIndex} />
          <Stack.Screen name="QuranViewer" component={QuranViewer} />
          <Stack.Screen name="SurahIndex" component={SurahIndex} />
          //<Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
