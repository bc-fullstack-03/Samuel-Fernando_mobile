import { ReactNode, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Envelope, Lock } from 'phosphor-react-native';

import { styles } from './styles';
import logo from '../../assets/logo.png';
import Heading from '../../components/Heading';
import { TextInput } from '../../components/TextInput';
import { THEME } from '../../theme';
import Spacer from '../../components/Spacer';
import Button from '../../components/Button';
import { Auth } from '../../model/Auth';

interface AuthFormProps {
  children?: ReactNode;
  authFormSubtitle: string;
  submitFormButtonText: string;
  registerName?: string;
  submitAction: (auth: Auth) => void;
}

function AuthForm(props: AuthFormProps) {
  const [auth, setAuth] = useState<Auth>({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const setRegisterName = () => {
      setAuth({ ...auth, name: props.registerName });
    };

    if (props.registerName) {
      setRegisterName();
    }
  }, [props.registerName]);


  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.containerPosition}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
    >
      <Image source={logo} style={styles.logo} resizeMethod='scale' />
      <Heading title='SysMap Parrot' subtitle={props.authFormSubtitle} />
      {props.children}
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>Endereço de e-mail</Text>
      </View>
      <TextInput.Root>
        <TextInput.Icon>
          <Envelope color={THEME.COLORS.CAPTION_400} />
        </TextInput.Icon>
        <TextInput.Input
          value={auth.email}
          onChangeText={(value) => setAuth({...auth, email: value })}
          placeholder='Digite seu e-mail'
          autoCapitalize='none'
          keyboardType='email-address'
        />
      </TextInput.Root>
      <Spacer />
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>Senha</Text>
      </View>
      <TextInput.Root>
        <TextInput.Icon>
          <Lock color={THEME.COLORS.CAPTION_400} />
        </TextInput.Icon>
        <TextInput.Input
          value={auth.password}
          onChangeText={(value) => setAuth({...auth, password: value })}
          placeholder='Digite sua senha'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
        />
      </TextInput.Root>
      <Spacer />
      <Button
        title={props.submitFormButtonText}
        width={240}
        onPress={() => props.submitAction(auth)}
      />
    </KeyboardAvoidingView>
  );
}

export default AuthForm;
