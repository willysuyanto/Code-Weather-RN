import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {List} from '../models/ForecastData';
import moment from 'moment';
import {Image} from '@rneui/themed';
import {getWeatherImageUrl, renderTemperature} from '../helpers/common';
import {size} from '../theme/sizes';
import {colors} from '../theme/colors';
import {scale, scaleFont} from '../helpers/scale';

interface HourlyForecastItemProps {
  item: null | List;
}

export default function HourlyForecastItem(props: HourlyForecastItemProps) {
  const item = props.item;
  const renderTime = (date: string | undefined) => {
    if (date) {
      const splitDate = date.split(' ');
      if (splitDate[1] === '00:00:00') {
        return moment(date).format('MMM DD');
      }
      return moment(date).format('HH:mm');
    }
  };
  return (
    <View style={styles.forecastContainer}>
      <Text style={styles.forecastDate}>{renderTime(item?.dt_txt)}</Text>
      <Image
        source={item ? {uri: getWeatherImageUrl(item.weather[0].icon)} : {}}
        style={styles.forecastIcon}
      />
      <Text style={styles.forecastTemp}>
        {renderTemperature(item?.main.temp)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forecastIcon: {
    height: 30,
    width: 30,
  },
  forecastContainer: {
    marginTop: size.md,
    alignItems: 'center',
    width: 60,
    backgroundColor: colors.gray,
    marginEnd: scale(10),
    padding: scale(5),
    borderRadius: 10,
  },
  forecastDate: {
    color: colors.text,
    fontWeight: '400',
  },
  forecastTemp: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: colors.textdark,
  },
});
