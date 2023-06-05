import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    padding: 16,
    alignItems: 'center',
  },
  usernameText: {
    fontFamily: THEME.FONTS.BOLD,
    fontSize: THEME.FONT_SIZES.LG,
    color: THEME.COLORS.TEXT,
    marginStart: 8,
  },
  heading: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  profilePhoto: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
});
