import { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ToastAndroid, FlatList } from 'react-native';
import { UserCircle } from 'phosphor-react-native';
import { PHOTO_SERVICE_HOST } from '@env';
import * as SecureStore from 'expo-secure-store';

import { styles } from './styles';
import Button from '../../components/Button';
import { Context as AuthContext } from '../../context/AuthContext';
import ImagePicker from '../../components/ImagePicker';
import { File } from '../../model/File';
import api from '../../services/api';
import { generateAuthHeader } from '../../services/auth';
import { navigate } from '../../../RootNavigation';
import Spacer from '../../components/Spacer';
import PostCard from '../../components/PostCard';
import { Post } from '../../model/Post';

function Profile({ navigation }) {
  const { profile, token, logout, userId } = useContext(AuthContext);
  const [image, setImage] = useState<File>();

  async function handlePhotoUpload() {
    const photoData = new FormData();
    image && photoData.append('photo', image as any);

    try {
      await api.post('/profile/photo', photoData, generateAuthHeader(token, true));
      const { data } = await api.get(`/profile/${profile.idUser}`, generateAuthHeader(token));
      await SecureStore.setItemAsync('profile', JSON.stringify(data));
      navigate('Profile');
    } catch (err) {
      ToastAndroid.show('Ocorreu um erro ao salvar a foto', ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        {profile && profile.photoUri != '' ?
          <Image
            source={{ uri: profile.photoUri.replace('localhost', PHOTO_SERVICE_HOST) }}
            style={styles.profilePhoto}
          />
          : <UserCircle color='white' size={64} weight='thin' />
        }
        <Text style={styles.usernameText}>{profile.name}</Text>
      </View>
      {!profile.photoUri && (
        <>
          <ImagePicker onFileLoaded={setImage} />
          <Spacer />
          {image && (
            <Button
              title='Salvar foto'
              width={240}
              onPress={handlePhotoUpload}
            />
          )}
          <Spacer />
        </>
      )}
      <Button title='Sair' width={240} onPress={logout} />
    </SafeAreaView>
  );
}

export default Profile;
