import {StyleSheet} from 'react-native';
import {size} from './sizes';
import {scaleFont} from '../helpers/scale';
import {colors} from './colors';

export const baseStyle = StyleSheet.create({
  textSmall: {
    fontSize: scaleFont(size.xs),
    color: colors.textdark,
  },
  textMedium: {
    fontSize: scaleFont(size.md),
    color: colors.textdark,
  },
  textLarge: {
    fontSize: scaleFont(size.lg),
    color: colors.textdark,
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
});
