import { useContext, useEffect, useId, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { PHOTO_SERVICE_HOST } from '@env';

import { Post } from '../../model/Post';
import { styles } from './styles';
import { Context as AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { generateAuthHeader } from '../../services/auth';
import { FlatList, Image, Text, View } from 'react-native';
import PostCard from '../../components/PostCard';
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
  const [errorComment, setErrorComment] = useState('');

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
  }, [post]);

  const addComment = async () => {
    if (description.length < 3) {
      setErrorComment('O comentário precisa ter ao menos 3 caracteres');
      return;
    }

    setDescription("");
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
                  onChangeText={(text) => {
                    setDescription(text);
                    setErrorComment('');
                  }}
                />
              </TextInput.Root>
              {errorComment && <Text style={styles.textError}>{errorComment}</Text>}
              <Button
                width={360}
                title='Publicar'
                onPress={() => {
                  addComment();
                }}
              />
              <View style={{ flex: 1 }}>
                <FlatList
                  nestedScrollEnabled
                  data={post.comments}
                  keyExtractor={({ id }) => id}
                  renderItem={({ item }: { item: any }) => {
                    console.log(item);
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
