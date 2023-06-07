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
  const [hasErrors, setHasErrors] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorName, setErrorName] = useState('');

  useEffect(() => {
    const setRegisterName = () => {
      setAuth({ ...auth, name: props.registerName });
    };

    if (props.registerName) {
      setRegisterName();
      setHasErrors(false);
      setErrorName('');
    }
  }, [props.registerName]);

  const handleSubmitAction = () => {
    if (props.children && auth.name.length < 3) {
      setHasErrors(true);
      setErrorName('O nome precisa ter ao menos 3 caracteres');
    }

    if (auth.email.length < 3) {
      setHasErrors(true);
      setErrorEmail('O email precisa ter ao menos 3 caracteres');
    }

    if (auth.password.length < 3) {
      setHasErrors(true);
      setErrorPassword('A senha precisa ter ao menos 3 caracteres');
    }

    if (hasErrors) {
      return;
    }

    props.submitAction(auth);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.containerPosition}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
    >
      <Image source={logo} style={styles.logo} resizeMethod='scale' />
      <Heading title='SysMap Parrot' subtitle={props.authFormSubtitle} />
      {props.children}
      {errorName && <Text style={styles.textError}>{errorName}</Text>}
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>Endereço de e-mail</Text>
      </View>
      <TextInput.Root>
        <TextInput.Icon>
          <Envelope color={THEME.COLORS.CAPTION_400} />
        </TextInput.Icon>
        <TextInput.Input
          value={auth.email}
          onChangeText={(value) => {
            setAuth({...auth, email: value });
            setErrorEmail('');
            setHasErrors(false);
          }}
          placeholder='Digite seu e-mail'
          autoCapitalize='none'
          keyboardType='email-address'
        />
      </TextInput.Root>
      {errorEmail && <Text style={styles.textError}>{errorEmail}</Text>}
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
          onChangeText={(value) => {
            setAuth({...auth, password: value });
            setHasErrors(false);
            setErrorPassword('');
          }}
          placeholder='Digite sua senha'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
        />
      </TextInput.Root>
      {errorPassword && <Text style={styles.textError}>{errorPassword}</Text>}
      <Spacer />
      <Button
        title={props.submitFormButtonText}
        width={240}
        onPress={() => handleSubmitAction()}
      />
    </KeyboardAvoidingView>
  );
}

export default AuthForm;
