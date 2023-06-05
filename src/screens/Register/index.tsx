import { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User } from 'phosphor-react-native';

import { Context as AuthContext } from '../../context/AuthContext';
import AuthForm from '../../components/AuthForm';
import { styles } from './styles';
import { TextInput } from '../../components/TextInput';
import { THEME } from '../../theme';
import Spacer from '../../components/Spacer';
import { useState } from 'react';

function Register({ navigation }) {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');

  return (
    <View>
      <AuthForm
        authFormSubtitle='Faça o cadastro agora mesmo!'
        submitFormButtonText='Cadastrar-se'
        submitAction={register}
        registerName={name}
      >
        <>
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>Nome de usuário</Text>
          </View>
          <TextInput.Root>
            <TextInput.Icon>
              <User color={THEME.COLORS.CAPTION_400} />
            </TextInput.Icon>
            <TextInput.Input
              placeholder='Digite seu nome'
              value={name}
              onChangeText={setName}
            />
          </TextInput.Root>
          <Spacer />
        </>
      </AuthForm>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>
          Já tem uma conta? Faça login agora!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Register;
