import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomColor: THEME.COLORS.CAPTION_400,
    borderBottomWidth: 0.75,
    paddingBottom: 12,
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
  postForm: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  captionText: {
    color: THEME.COLORS.CAPTION_400,
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: THEME.FONT_SIZES.SM,
  },
  buttonContainer: {
    paddingTop: 14,
  },
});
