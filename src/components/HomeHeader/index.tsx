import { Text, View, Image } from 'react-native';
import { UserCircle } from 'phosphor-react-native';
import { PHOTO_SERVICE_HOST } from '@env';

import { styles } from './styles';
import Button from '../../components/Button';
import { navigate } from '../../../RootNavigation';
import { Profile } from '../../model/Profile';

interface HomeHeaderProps {
  profile: Profile;
}

function HomeHeader({ profile }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      {profile.photoUri != '' ?
        <Image
          source={{ uri: profile.photoUri.replace('localhost', PHOTO_SERVICE_HOST) }}
          style={styles.profilePhoto}
        />
        : <UserCircle color='white' weight='thin' size={48} />
      }
      <Text style={styles.usernameText}>{profile.name}</Text>
      <View style={{ flex: 1 }}></View>
      <Button title='Novo Post' width={120} onPress={() => navigate('NewPost')} />
    </View>
  );
}

export default HomeHeader;
