import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  link: {
    color: THEME.COLORS.CAPTION_400,
    textDecorationLine: 'underline',
    fontSize: THEME.FONT_SIZES.SM,
    textAlign: 'center',
    fontFamily: THEME.FONTS.REGULAR,
  },
});
