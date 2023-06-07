import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentHeaderText: {
    fontFamily: THEME.FONTS.BOLD,
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT,
    paddingTop: 12,
  },
  heading: {
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  profileName: {
    fontFamily: THEME.FONTS.SEMIBOLD,
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT,
  },
  commentContainer: {
    paddingHorizontal: 16,
    gap: 12,
    flex: 1,
  },
  commentText: {
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: THEME.FONT_SIZES.SM,
    color: THEME.COLORS.TEXT,
    paddingTop: 5,
    paddingLeft: 52,
    paddingBottom: 5,
  },
  textError: {
    color: THEME.COLORS.ERROR,
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: THEME.FONT_SIZES.SM,
  },
});
