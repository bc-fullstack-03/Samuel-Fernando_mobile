import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.BUTTON,
    padding: 12,
    minWidth: 120,
    maxWidth: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontFamily: THEME.FONTS.SEMIBOLD,
    fontSize: THEME.FONT_SIZES.MD,
  },
});
