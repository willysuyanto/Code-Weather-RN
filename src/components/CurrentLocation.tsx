import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Icon} from '@rneui/themed';
import {colors} from '../theme/colors';
import {baseStyle} from '../theme/styles';
import {scale} from '../helpers/scale';
import {size} from '../theme/sizes';
import {useAppSelector} from '../redux/hooks';

export default function CurrentLocation() {
  const {t} = useTranslation();
  const location = useAppSelector(state => state.location);

  return (
    <View style={[baseStyle.flexRow, baseStyle.alignCenter, styles.container]}>
      <View style={styles.locationContainer}>
        <Icon
          name="map-pin"
          type="feather"
          color={colors.primary}
          style={styles.locationIcon}
        />
        <View>
          <Text style={[baseStyle.textSmall]}>{t('currentLocation')}</Text>
          <Text style={[baseStyle.textMedium]}>
            {`${location.data?.length ? location.data[0].name : ''}, ${
              location.data?.length ? location.data[0].state : ''
            }`}
          </Text>
        </View>
      </View>
      <Button
        icon={<Icon name="search" type="feather" size={size.lg} />}
        type="clear"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginEnd: scale(8),
  },
  container: {
    justifyContent: 'space-between',
  },
});
