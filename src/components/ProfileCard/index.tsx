import { useState, useContext, useEffect } from 'react';
import { View, Text, ToastAndroid, Image } from 'react-native';
import { UserCircle } from 'phosphor-react-native';
import { PHOTO_SERVICE_HOST } from '@env';

import { styles } from './styles';
import { Profile } from '../../model/Profile';
import Button from '../../components/Button';
import { Context as AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { generateAuthHeader } from '../../services/auth';

interface ProfileCardProps {
  profile: Profile;
}

function ProfileCard({ profile }: ProfileCardProps) {
  const { userId, token } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(profile.followers.length);

  useEffect(() => {
    if (profile.followers.includes(userId)) {
      setFollowed(true);
    }
  }, [userId, profile.followers]);

  const handleProfileFollow = async (profileId: string) => {
    try {
      if (!followed) {
        await api.post(`/profile/${profileId}/follow`, null, generateAuthHeader(token));

        setFollowed(true);
        setFollowersCount(followersCount + 1);
      } else {
        await api.post(`/profile/${profileId}/unfollow`, null, generateAuthHeader(token));

        setFollowed(false);
        setFollowersCount(followersCount - 1);
      }
    } catch (err) {
      ToastAndroid.show('Ocorreu um erro ao interagir com o perfil', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.profileCard}>
      <View style={styles.profileCardHeading}>
        {profile.photoUri != '' ?
          <Image
            source={{ uri: profile.photoUri.replace('localhost', PHOTO_SERVICE_HOST) }}
            style={styles.profilePhoto}
          />
          : <UserCircle color='white' weight='thin' size={48} />
        }
        <Text style={styles.usernameText}>{profile.name}</Text>
      </View>
      <View style={styles.followDetailsContainer}>
        <Text style={styles.followDetailsText}>{followersCount} seguidores</Text>
        <Text style={styles.followDetailsText}>seguindo {profile.following.length} perfis</Text>
        <Button
          title={followed ? 'Deixar de seguir' : 'Seguir'}
          width={360}
          onPress={() => handleProfileFollow(profile.idUser)}
        />
      </View>
    </View>
  );
}

export default ProfileCard;
