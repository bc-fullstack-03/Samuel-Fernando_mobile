import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import InfiniteScroll from 'react-native-infinite-scrolling';

import { styles } from './styles';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';
import HomeHeader from '../../components/HomeHeader';
import PostCard from '../../components/PostCard';
import { navigate } from '../../../RootNavigation';

function Posts() {
  const { profile } = useContext(AuthContext);
  const { posts, isLastPostPage, getPosts } = useContext(PostContext);
  const [actualPage, setActualPage] = useState(0);

  useEffect(() => {
    getPosts();
  }, [profile.following]);

  useEffect(() => {
    if (!isLastPostPage) {
      getPosts(actualPage);
    }
  }, [actualPage]);

  const loadMore = () => {
    setActualPage(actualPage + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader profile={profile} />
      <View style={styles.feed}>
        <InfiniteScroll
          data={posts}
          keyExtractor={({ id }) => id}
          renderData={({ item }) => (
            <TouchableOpacity
              onPress={() => navigate("PostDetail", { id: item.id })}
            >
              <PostCard post={item} />
            </TouchableOpacity>
          )}
          loadMore={loadMore}
        />
      </View>
    </SafeAreaView>
  );
}

export default Posts;
