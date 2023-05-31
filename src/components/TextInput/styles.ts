import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    minWidth: 240,
    padding: 12,
    borderRadius: 5,
    backgroundColor: THEME.COLORS.BACKGROUND_600,
    flexDirection: 'row',
  },
  input: {
    color: THEME.COLORS.TEXT,
    marginStart: 12,
    flex: 1,
    fontFamily: THEME.FONTS.REGULAR,
  },
  inputFocused: {
    borderWidth: 2,
    minWidth: 242,
    borderColor: THEME.COLORS.CYAN_300,
    borderRadius: 5,
  },
});
