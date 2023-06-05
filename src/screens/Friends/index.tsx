import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';

import api from '../../services/api';
import { styles } from './styles';
import { generateAuthHeader } from '../../services/auth';
import { Profile } from '../../model/Profile';
import { Context as AuthContext } from '../../context/AuthContext';
import { ToastAndroid } from 'react-native';
import ProfileCard from '../../components/ProfileCard';

function Friends({ navigation }) {
  const { token, userId, logout } = useContext(AuthContext);
  const [profiles, setProfiles] = useState<Profile[]>([]);

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={profiles}
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
