import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.75,
    borderBottomColor: THEME.COLORS.CAPTION_400,
    gap: 5,
  },
  profilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  usernameText: {
    fontFamily: THEME.FONTS.BOLD,
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT,
    marginStart: 8,
  },
});
