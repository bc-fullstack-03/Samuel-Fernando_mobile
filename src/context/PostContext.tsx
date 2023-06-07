import React, { ReactNode, useContext, useReducer } from 'react';

import api from '../services/api';
import { Post } from '../model/Post';
import { generateAuthHeader } from '../services/auth';
import { Context as AuthContext } from './AuthContext';
import { navigate } from '../../RootNavigation';
import { File } from '../model/File';

interface PostContext {
  posts: Post[];
  isLastPostPage: boolean;
  getPosts?: (page?: number) => Post[];
  likePost?: (postId: string) => void;
  unlikePost?: (postId: string) => void;
  createPost?: (newPost: PostCreate, file: File) => void;
}

interface PostCreate {
  title: string;
  description: string;
  isImage: boolean;
}

const defaultValue = {
  posts: [],
  isLastPostPage: false,
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
          posts: [].concat(posts).concat(action.payload.posts),
          isLastPostPage: action.payload.isLastPostPage,
        };

      case 'post_create': {
        return {
          ...state,
          posts: [action.payload, ...state.posts],
        };
      }

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

  const getPosts = async (page?: number) => {
    try {
      const { data } = await api.get(`/feed?page=${page}`, generateAuthHeader(token));

      const posts = data.postResponse.map((post: Post) => {
        return { ...post, liked: post.likes.includes(userId) }
      });

      dispatch({
        type: 'show_posts',
        payload: {
          posts,
          isLastPostPage: data.pageableResponse.isLast,
        },
      });
    } catch (err) {
      if (err.response.data.status === 401) {
        return logout();
      }
    }
  }

  const createPost = async (newPost: PostCreate, file: any) => {
    const postData = new FormData();

    if (file) {
      postData.append('photo', file);
      newPost.isImage = true;
    } else {
      postData.append('photo', null);
    }

    try {
      await api.post(
        `/post?title=${newPost.title}&description=${newPost.description}&isImage=${newPost.isImage}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: (data, headers) => {
            return postData;
          },
        }
      );

      const { data } = await api.get('/post', generateAuthHeader(token));

      dispatch({
        type: 'post_create',
        payload: data[data.length - 1],
      });

      navigate('Posts');
    } catch (err) {
      console.error(err);
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
    <Context.Provider value={{ ...state, getPosts, likePost, unlikePost, createPost }}>
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
