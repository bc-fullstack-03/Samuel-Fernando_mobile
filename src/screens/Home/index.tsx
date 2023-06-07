import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider as PostProvider } from '../../context/PostContext';
import { THEME } from '../../theme';
import NewPost from '../NewPost';
import PostDetail from '../PostDetail';
import Posts from '../Posts';

const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: THEME.COLORS.BACKGROUND_900,
        statusBarStyle: 'light',
      }}
    >
      <Stack.Screen name='Posts' component={Posts} />
      <Stack.Screen name='PostDetail' component={PostDetail} />
      <Stack.Screen name='NewPost' component={NewPost} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <PostProvider>
      <Home />
    </PostProvider>
  );
};
