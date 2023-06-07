import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';

import api from '../../services/api';
import { styles } from './styles';
import { generateAuthHeader } from '../../services/auth';
import { Profile } from '../../model/Profile';
import { Context as AuthContext } from '../../context/AuthContext';
import { ToastAndroid } from 'react-native';
import ProfileCard from '../../components/ProfileCard';
import { TextInput } from '../../components/TextInput';

function Friends({ navigation }) {
  const { token, userId, logout } = useContext(AuthContext);
  const [searchResult, setSearchResult] = useState<Profile[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const renderProfiles = searchResult.length > 0 ? searchResult : profiles;

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const { data } = await api.get('/profile', generateAuthHeader(token));
        setProfiles(data);
      } catch (err) {
        if (err.response.data.status === 401) {
          return logout();
        }

        ToastAndroid.show('Ocorreu um erro ao buscar os perfis', ToastAndroid.SHORT);
      }
    };

    getProfiles();
  }, []);

  async function searchProfiles(search: string) {
    try {
      const { data } = await api.get(`/profile?name=${search}`, generateAuthHeader(token));
      setSearchResult(data);
    } catch (err) {
      ToastAndroid.show('Ocorreu um erro ao buscar um usuário', ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput.Root>
          <TextInput.Input
            placeholder='Buscar por nome'
            onChangeText={(name) => searchProfiles(name)}
          />
        </TextInput.Root>
      </View>
      <FlatList
        data={renderProfiles}
        keyExtractor={({ idUser }) => idUser}
        renderItem={({ item }) => {
          return item.idUser != userId && (
            <ProfileCard profile={item} />
          );
        }}
      />
    </SafeAreaView>
  );
}

export default Friends;
