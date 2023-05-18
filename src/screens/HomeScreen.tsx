import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Image} from '@rneui/base';
import {getWeatherForecast} from '../redux/slices/WeatherSlices';
import Geolocation from '@react-native-community/geolocation';

export default function HomeScreen() {
  const weather = useAppSelector(state => state.weather);
  const dispatch = useAppDispatch();

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(location => {
      console.log(location);
      dispatch(
        getWeatherForecast({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        }),
      );
    });
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Open Weather App Location Permission',
              message:
                'Open Weather App needs access to your current location ' +
                'to provide you with weather info in your current location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);
  return (
    <SafeAreaView>
      {!weather.data && !weather.loading ? (
        <Text>No Data</Text>
      ) : weather.loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>{weather.error?.message}</Text>
          <Text>{weather.data?.base}</Text>
          <Text>{weather.data?.weather[0].icon}</Text>
          <Text>{weather.data?.coord.lon}</Text>
          <Text>{weather.data?.coord.lon}</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${weather.data?.weather[0].icon}.png`,
            }}
            style={{height: 100, width: 100}}
          />
        </View>
      )}
      <Button
        title="Test"
        onPress={() =>
          dispatch(getWeatherForecast({lat: -6.95718, lon: 107.643707}))
        }
      />
    </SafeAreaView>
  );
}
