import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';

import { THEME } from '../../theme';
import { styles } from './styles';

interface LoadingProps {
  color?: string,
  loadingStyle?: StyleProp<ViewStyle>;
  size: number | 'small' | 'large';
}

function Loading(props: LoadingProps) {
  return (
    <View style={styles.container}
    >
      <ActivityIndicator
        color={props.color ? props.color : THEME.COLORS.TEXT}
        style={props.loadingStyle}
        size={props.size}
      />
    </View>
  );
}

export default Loading;
