import { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Chat, Heart, UserCircle } from 'phosphor-react-native';
import { PHOTO_SERVICE_HOST } from '@env';

import { styles } from './styles';
import { Context as PostContext } from '../../context/PostContext';
import { Post } from '../../model/Post';
import Spacer from '../Spacer';
import { THEME } from '../../theme';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const { likePost, unlikePost } = useContext(PostContext);

  function handlePostLike() {
    if (post.liked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {post.userProfile.photoUri != '' ?
          <Image
            source={{ uri: post.userProfile.photoUri.replace('localhost', PHOTO_SERVICE_HOST) }}
            style={styles.profilePhoto}
          />
          : <UserCircle color='white' weight='thin' size={48} />
        }
        <Text style={styles.profileName}>{post.userProfile.name}</Text>
      </View>
      <Spacer>
        <Text style={styles.postTitle}>{post.title}</Text>
        {post.isImage ? (
          <Image
            source={{ uri: post.description.replace('localhost', PHOTO_SERVICE_HOST) }}
            style={styles.postImage}
          />
        ) : (
          <Text style={styles.postDescription}>{post.description}</Text>
        )}
      </Spacer>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => handlePostLike()}>
          {post.liked ?
            <Heart size={24} color={THEME.COLORS.BUTTON} weight='fill' />
            : <Heart size={24} color='white' weight='thin' />
          }
        </TouchableOpacity>
        <Text style={styles.postNumber}>{post.likes.length}</Text>
        <Chat size={24} color='white' weight='thin' />
        <Text style={styles.postNumber}>{post.comments.length}</Text>
      </View>
    </View>
  );
}

export default PostCard;
