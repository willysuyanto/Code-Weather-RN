import {View, Text} from 'react-native';
import React from 'react';
import {List} from '../models/ForecastData';
import moment from 'moment';

interface HourlyForecastItemProps {
  item: null | List;
}

export default function HourlyForecastItem(props: HourlyForecastItemProps) {
  const item = props.item;
  const renderTime = () => {};
  return (
    <View>
      <Text>{moment(item?.dt_txt).format('D')}</Text>
    </View>
  );
}
