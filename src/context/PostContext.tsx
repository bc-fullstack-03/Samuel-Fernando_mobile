import React, { ReactNode, useContext, useReducer } from 'react';

import api from '../services/api';
import { Post } from '../model/Post';
import { generateAuthHeader } from '../services/auth';
import { Context as AuthContext } from './AuthContext';

interface PostContext {
  posts: Post[];
  getPosts?: () => Post[];
  likePost?: (postId: string) => void;
  unlikePost?: (postId: string) => void;
}

const defaultValue = {
  posts: [],
};

const Context = React.createContext<PostContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const { token, userId, logout } = useContext(AuthContext);

  const reducer = (state, action) => {
    const { posts } = state;

    switch (action.type) {
      case 'show_posts':
        return {
          ...state,
          posts: action.payload,
        };

      case 'post_like': {
        const index = posts.findIndex(
          (post: Post) => post.id === action.payload.id
        );
        posts[index].liked = action.payload.liked;
        posts[index].likes = [...posts[index].likes, action.payload.userId];

        return { ...state, posts, };
      };

      case 'post_unlike': {
        const index = posts.findIndex(
          (post: Post) => post.id === action.payload.id
        );
        posts[index].liked = action.payload.liked;
        posts[index].likes = posts[index].likes.filter(
          (like: string) => like !== action.payload.userId,
        );

        return { ...state, posts };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getPosts = async () => {
    try {
      const { data } = await api.get(`/feed`, generateAuthHeader(token));

      const posts = data.postResponse.map((post: Post) => {
        return { ...post, liked: post.likes.includes(userId) }
      });

      dispatch({
        type: 'show_posts',
        payload: posts,
      });
    } catch (err) {
      if (err.response.data.status === 401) {
        return logout();
      }
    }
  }

  const likePost = async (postId: string) => {
    try {
      await api.post(`/post/${postId}/like`, null, generateAuthHeader(token));

      dispatch({
        type: 'post_like',
        payload: { id: postId, liked: true, userId },
      });
    } catch (err) {

    }
  }

  const unlikePost = async (postId: string) => {
    try {
      await api.post(`/post/${postId}/unlike`, null, generateAuthHeader(token));

      dispatch({
        type: 'post_unlike',
        payload: { id: postId, liked: false, userId },
      });
    } catch (err) {

    }
  }

  return (
    <Context.Provider value={{ ...state, getPosts, likePost, unlikePost }}>
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
