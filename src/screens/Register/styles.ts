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
  captionContainer: {
    width: 240,
    textAlign: 'left',
    marginBottom: 6,
  },
  caption: {
    color: THEME.COLORS.CAPTION_400,
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: THEME.FONT_SIZES.SM,
  },
});
