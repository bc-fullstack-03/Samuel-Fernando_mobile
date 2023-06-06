import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    borderBottomColor: THEME.COLORS.CAPTION_400,
    borderBottomWidth: 0.75,
    paddingBottom: 12,
  },
  heading: {
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  profileName: {
    fontFamily: THEME.FONTS.BOLD,
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT,
  },
  postTitle: {
    fontFamily: THEME.FONTS.BOLD,
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT,
    marginStart: 10,
  },
  postImage: {
    minWidth: 200,
    minHeight: 200,
    marginHorizontal: 12,
    marginTop: 12,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  postDescription: {
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: THEME.FONT_SIZES.SM,
    color: THEME.COLORS.TEXT,
    marginTop: 12,
    marginStart: 10,
  },
  footer: {
    flexDirection: 'row',
    gap: 7,
    marginStart: 22,
    alignItems: 'center',
  },
  postNumber: {
    fontFamily: THEME.FONTS.REGULAR,
    fontSize: THEME.FONT_SIZES.SM,
    color: THEME.COLORS.TEXT,
  },
});
