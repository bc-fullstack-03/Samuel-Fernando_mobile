import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
  },
  containerPosition: {
    alignItems: 'center',
    marginTop: 4,
    paddingBottom: 30,
  },
  logo: {
    height: 100,
    width: 100,
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
