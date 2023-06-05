import { useContext } from 'react';
import { Platform, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

import { Context as AuthContext } from '../../context/AuthContext';
import { styles } from './styles';
import AuthForm from '../../components/AuthForm';

function LoginScreen({ navigation }) {
  const { login, errorMessage } = useContext(AuthContext);

  return (
    <View>
      <AuthForm
        authFormSubtitle='Faça login e comece a usar!'
        submitFormButtonText='Entrar'
        submitAction={login}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>
          Não tem uma conta? Crie uma agora!
        </Text>
      </TouchableOpacity>
      <>
        {errorMessage && Platform.OS === 'android' && ToastAndroid.show(errorMessage, ToastAndroid.LONG)}
      </>
    </View>
  );
}

export default LoginScreen;
