import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  width: 120 | 240 | 360;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, { width: props.width }]} {...props}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
