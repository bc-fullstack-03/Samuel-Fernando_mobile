import * as SecureStore from 'expo-secure-store';

async function getAuthHeader() {
  const token = await SecureStore.getItemAsync('accessToken');

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return authHeader;
}

export { getAuthHeader };
