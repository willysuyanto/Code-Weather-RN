import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from '@rneui/base';
import {AppLogo} from '../theme/images';
import {useNavigation} from '@react-navigation/native';
import {MainNavigationParamList} from '../navigations/MainNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  MainNavigationParamList,
  'Splash'
>;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={AppLogo} style={styles.logo} resizeMode="contain" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 200,
  },
});
