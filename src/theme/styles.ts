import {StyleSheet} from 'react-native';
import {size} from './sizes';
import {scaleFont} from '../helpers/scale';

export const baseStyle = StyleSheet.create({
  textSmall: {
    fontSize: scaleFont(size.xs),
  },
  textMedium: {
    fontSize: scaleFont(size.md),
  },
  textLarge: {
    fontSize: scaleFont(size.lg),
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
});
