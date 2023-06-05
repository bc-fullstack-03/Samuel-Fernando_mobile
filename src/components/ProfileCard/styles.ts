import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  profileCardHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  profileCard: {
    marginVertical: 8,
    gap: 5,
    borderBottomWidth: 0.75,
    borderBottomColor: THEME.COLORS.CAPTION_400,
    paddingBottom: 20,
  },
  usernameText: {
    fontFamily: THEME.FONTS.BOLD,
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT,
    marginStart: 8,
  },
  followDetailsText: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZES.SM,
    fontFamily: THEME.FONTS.REGULAR,
  },
  followDetailsContainer: {
    paddingHorizontal: 20,
    gap: 5,
  },
  profilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
});
