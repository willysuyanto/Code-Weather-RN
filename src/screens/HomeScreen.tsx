import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from '@rneui/base';
import {
  getCurrentWeather,
  getWeatherForecast,
} from '../redux/slices/WeatherSlices';
import Geolocation from '@react-native-community/geolocation';
import {getWeatherImageUrl} from '../helpers/common';
import CurrentLocation from '../components/CurrentLocation';
import {colors} from '../theme/colors';
import {size} from '../theme/sizes';
import {getCurrentLocationInfo} from '../redux/slices/LocationSlices';
import {scale, scaleFont} from '../helpers/scale';
import {baseStyle} from '../theme/styles';
import {Card, Icon} from '@rneui/themed';
import i18n from '../i18n/i18n';
import HourlyForecastItem from '../components/HourlyForecastItem';

export default function HomeScreen() {
  const weather = useAppSelector(state => state.weather);
  const dispatch = useAppDispatch();
  const {t} = i18n;

  useEffect(() => {
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(location => {
        const coords = {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        };
        dispatch(getCurrentLocationInfo(coords));
        dispatch(getCurrentWeather(coords));
        dispatch(getWeatherForecast(coords));
      });
    };
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
  }, [dispatch]);

  const renderTemperature = (temp: number | undefined) => {
    if (temp) {
      return `${Math.ceil(temp)}°C`;
    }
    return '';
  };

  const convertToKm = (visibility: number | undefined) => {
    if (visibility) {
      return visibility * 0.001;
    }
    return '-';
  };

  const renderLoader = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CurrentLocation />
        {weather.loading ? (
          renderLoader()
        ) : (
          <View style={styles.currentInfo}>
            <View style={[baseStyle.flexRow, baseStyle.alignCenter]}>
              <Image
                source={
                  weather.currentWeather
                    ? {
                        uri: getWeatherImageUrl(
                          weather.currentWeather?.weather[0].icon,
                        ),
                      }
                    : {}
                }
                style={styles.weatherIcon}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.mainText}>
                  {weather.currentWeather?.weather[0].main}
                </Text>
                <Text style={[baseStyle.textSmall, styles.descText]}>
                  {weather.currentWeather?.weather[0].description}
                </Text>
              </View>
            </View>
            <Text style={styles.tempText}>
              {renderTemperature(weather.currentWeather?.main.temp)}
            </Text>
            <Text style={styles.descText}>
              {`Feels like ${renderTemperature(
                weather.currentWeather?.main.feels_like,
              )}`}
            </Text>
            <Card containerStyle={styles.detailCard}>
              <Card.Title>{t('weatherDetails')}</Card.Title>
              <Card.Divider />
              <View style={styles.weatherDetailInfo}>
                <Text style={styles.detailInfoLabel}>Wind</Text>
                <View style={baseStyle.flexRow}>
                  <Text
                    style={
                      styles.detailInfoText
                    }>{`${weather.currentWeather?.wind.speed} m/s`}</Text>
                  <Icon
                    type="feather"
                    name="navigation-2"
                    size={18}
                    style={
                      iconRotation(
                        weather.currentWeather?.wind.deg,
                      ) as ViewStyle
                    }
                  />
                </View>
              </View>
              <Card.Divider />
              <View style={styles.weatherDetailInfo}>
                <Text style={styles.detailInfoLabel}>Humidity</Text>
                <Text
                  style={
                    styles.detailInfoText
                  }>{`${weather.currentWeather?.main.humidity} %`}</Text>
              </View>
              <Card.Divider />
              <View style={styles.weatherDetailInfo}>
                <Text style={styles.detailInfoLabel}>Visibility</Text>
                <Text style={styles.detailInfoText}>{`${convertToKm(
                  weather.currentWeather?.visibility,
                )} km`}</Text>
              </View>
              <Card.Divider />
              <View style={styles.weatherDetailInfo}>
                <Text style={styles.detailInfoLabel}>Pressure</Text>
                <Text
                  style={
                    styles.detailInfoText
                  }>{`${weather.currentWeather?.main.pressure}hPa`}</Text>
              </View>
              <Card.Divider />
            </Card>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}>
              {weather.data?.list.map(item => (
                <HourlyForecastItem key={item.dt} item={item} />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: size.xs,
  },
  currentInfo: {
    alignItems: 'center',
    marginTop: scale(30),
  },
  weatherIcon: {
    width: scale(60),
    height: scale(50),
  },
  mainText: {
    fontSize: scaleFont(size.sm),
    color: colors.textdark,
  },
  descText: {
    color: colors.secondary,
  },
  tempText: {
    fontSize: scaleFont(72),
    color: colors.textdark,
  },
  detailCard: {
    width: '100%',
    borderRadius: 10,
  },
  weatherDetailInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(5),
  },
  detailInfoText: {
    fontWeight: '600',
    color: colors.textdark,
  },
  detailInfoLabel: {
    color: colors.textdark,
  },
  loader: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '50%',
  },
  loadingText: {
    color: colors.textdark,
  },
});

const iconRotation = (rotation: number | undefined): ViewStyle => ({
  transform: [{rotate: `${rotation ? rotation : 0}deg`}],
});
