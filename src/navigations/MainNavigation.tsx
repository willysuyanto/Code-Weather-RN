import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';

export type MainNavigationParamList = {
  Splash: undefined;
  Home: undefined;
};

export type MainNavigationStackProps<T extends keyof MainNavigationParamList> =
  NativeStackScreenProps<MainNavigationParamList, T>;

export default function MainNavigation() {
  const Stack = createNativeStackNavigator<MainNavigationParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
