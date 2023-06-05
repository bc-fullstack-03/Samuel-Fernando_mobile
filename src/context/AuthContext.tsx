import React, { ReactNode, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

import { Auth, UserToken } from '../model/Auth';
import api from '../services/api';
import { Profile } from '../model/Profile';

interface AuthContext {
  token: string | null;
  userId: string | null;
  profile: Profile | null;
  errorMessage: string | null;
  isLoading: boolean;
  login?: () => void;
  tryLocalLogin?: () => void;
  register?: () => void;
}

const defaultValue = {
  token: null,
  userId: null,
  profile: null,
  errorMessage: null,
  isLoading: true,
};

const Context = React.createContext<AuthContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          ...action.payload,
          errorMessage: '',
        };

      case 'auth_error':
        return {
          ...state,
          errorMessage: action.payload,
          isLoading: false,
        };

      case 'user_created':
        return {
          ...state,
          ...action.payload,
          errorMessage: '',
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const login = async (auth: Auth) => {
    try {
      const { data } = await api.post('/authentication', auth);
      const decodedToken = jwtDecode(data.token) as UserToken;
      const userProfile = await api.get(`/profile/${decodedToken.sub}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      await SecureStore.setItemAsync('accessToken', data.token);
      await SecureStore.setItemAsync('profile', JSON.stringify(userProfile.data));
      await SecureStore.setItemAsync('userId', decodedToken.sub);

      dispatch({
        type: 'login',
        payload: {
          token: data.token,
          profile: userProfile.data,
          userId: data.userId,
          isLoading: false,
        },
      });
    } catch (err) {
      dispatch({
        type: 'auth_error',
        payload: 'Ocorreu um erro na autenticação',
      });
    }
  };

  const tryLocalLogin = async () => {
    try {
      const [token, profile, userId] = await Promise.all([
        await SecureStore.getItemAsync('accessToken'),
        JSON.parse(await SecureStore.getItemAsync('profile') as string),
        await SecureStore.getItemAsync('userId'),
      ]);

      dispatch({
        type: 'login',
        payload: {
          token,
          profile,
          userId,
          isLoading: false,
        },
      });
    } catch (err) {

    }
  }

  const register = async (auth: Auth) => {
    try {
      await api.post('/user', auth);
      dispatch({
        type: 'user_created',
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'auth_error',
        payload: 'Ocorreu um erro na criação da conta',
      });
    }
  }

  return (
    <Context.Provider value={{...state, login, tryLocalLogin, register}}>
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
