import { StatusBar } from 'react-native';
import { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { House, User, UsersThree } from 'phosphor-react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import HomeScreen from './src/screens/Home';
import FriendsScreen from './src/screens/Friends';
import ProfileScreen from './src/screens/Profile';
import { THEME } from './src/theme';
import Loading from './src/components/Loading';
import { navigationRef } from './RootNavigation';

function App() {
  const { token, isLoading, tryLocalLogin } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    tryLocalLogin();
    StatusBar.setBackgroundColor(THEME.COLORS.BACKGROUND_900);
    StatusBar.setBarStyle('light-content');
  });

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  if (!fontsLoaded || isLoading) {
    return <Loading size='large' />;
  }

  const AppTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      background: THEME.COLORS.BACKGROUND_900,
    },
  };

  return (
    <NavigationContainer theme={AppTheme} ref={navigationRef}>
      {token ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              switch (route.name) {
                case 'Home': {
                  return <House size={size} color={color} weight={focused ? 'fill' : 'regular'} />;
                };
                case 'Friends': {
                  return <UsersThree size={size} color={color} weight={focused ? 'fill' : 'regular'} />;
                };
                case 'Profile': {
                  return <User size={size} color={color} weight={focused ? 'fill' : 'regular'} />;
                };
                default:
                  break;
              };
            },
            tabBarStyle: {
              backgroundColor: THEME.COLORS.BACKGROUND_600,
            },
            tabBarShowLabel: false,
            headerShown: false,
          })}
        >
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='Friends' component={FriendsScreen} />
          <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarColor: THEME.COLORS.BACKGROUND_900,
            statusBarStyle: 'light',
          }}
        >
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
