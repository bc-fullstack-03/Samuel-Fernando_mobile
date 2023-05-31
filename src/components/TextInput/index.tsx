import { ReactNode, useState } from 'react';
import { View, TextInput as Input, TextInputProps, Pressable, TouchableWithoutFeedback } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

interface TextInputRootProps {
  children: ReactNode;
  isFocused?: boolean;
}

interface TextInputInputProps extends TextInputProps { }

interface TextInputIconProps {
  children: ReactNode;
}

function TextInputRoot({ children }: TextInputRootProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableWithoutFeedback
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <View
        style={[styles.container, isFocused && styles.inputFocused]}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

function TextInputInput(props: TextInputInputProps) {
  return (
    <Input
      style={styles.input}
      placeholderTextColor={THEME.COLORS.CAPTION_400}
      {...props}
    />
  );
}

function TextInputIcon({ children }: TextInputIconProps) {
  return (
    <>
      {children}
    </>
  );
}

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
};
