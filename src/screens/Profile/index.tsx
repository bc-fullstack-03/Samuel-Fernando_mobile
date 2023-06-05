import { useContext } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { UserCircle } from 'phosphor-react-native';
import { PHOTO_SERVICE_HOST } from '@env';

import { styles } from './styles';
import Button from '../../components/Button';
import { Context as AuthContext } from '../../context/AuthContext';

function Profile({ navigation }) {
  const { profile, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        {profile.photoUri != '' ?
          <Image
            source={{ uri: profile.photoUri.replace('localhost', PHOTO_SERVICE_HOST) }}
            style={styles.profilePhoto}
          />
          : <UserCircle color='white' size={64} weight='thin' />
        }
        <Text style={styles.usernameText}>{profile.name}</Text>
      </View>
      <Button title='Sair' width={240} onPress={logout} />
    </SafeAreaView>
  );
}

export default Profile;
