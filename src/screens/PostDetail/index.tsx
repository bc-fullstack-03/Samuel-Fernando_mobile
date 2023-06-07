import { useContext, useEffect, useId, useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { PHOTO_SERVICE_HOST } from '@env';

import { Post } from '../../model/Post';
import { styles } from './styles';
import { Context as AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { generateAuthHeader } from '../../services/auth';
import { FlatList, Image, KeyboardAvoidingView, Text, View } from 'react-native';
import PostCard from '../../components/PostCard';
import Spacer from '../../components/Spacer';
import { TextInput } from '../../components/TextInput';
import Button from '../../components/Button';
import { UserCircle } from 'phosphor-react-native';

interface PostDetailProps {
  route: any;
}

function PostDetail({ route }: PostDetailProps) {
  const { id } = route.params;
  const { token, userId } = useContext(AuthContext);
  const [post, setPost] = useState<Post>();
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await api.get(`/post/${id}`, generateAuthHeader(token));

        const post = {
          ...response.data,
          liked: response.data.likes.includes(userId),
        };

        setPost(post);
      } catch (err) {

      }
    }

    getPost();
  }, [post.likes]);

  const addComment = async () => {
    try {
      await api.post(
        `/post/${id}/comments`,
        { description },
        generateAuthHeader(token),
      );

      const { data } = await api.get(`/post/${id}`, generateAuthHeader(token));

      setPost(data);
    } catch (err) {

    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {post &&
          <>
            <PostCard post={post} />
            <View style={styles.commentContainer}>
              <Text style={styles.commentHeaderText}>Comentários</Text>
              <TextInput.Root>
                <TextInput.Input
                  placeholder='Novo comentário'
                  value={description}
                  onChangeText={setDescription}
                />
              </TextInput.Root>
              <Button
                width={360}
                title='Publicar'
                onPress={() => {
                  setDescription("");
                  addComment();
                }}
              />
              <View style={{ flex: 1 }}>
                <FlatList
                  nestedScrollEnabled
                  data={post.comments}
                  keyExtractor={({ _id }) => _id}
                  renderItem={({ item }: { item: any }) => {
                    return (
                      <>
                        <View style={styles.heading}>
                          {item.userProfile.photoUri != '' ?
                            <Image
                              source={{ uri: item.userProfile.photoUri.replace('localhost', PHOTO_SERVICE_HOST) }}
                              style={styles.profilePhoto}
                            />
                            : <UserCircle color='white' weight='thin' size={48} />
                          }
                          <Text style={styles.profileName}>{item.userProfile.name}</Text>
                        </View>
                        <Text style={styles.commentText}>{item.description}</Text>
                      </>
                    );
                  }}
                />
              </View>
            </View>
          </>
        }
      </SafeAreaView>
    </>
  );
}

export default PostDetail;
