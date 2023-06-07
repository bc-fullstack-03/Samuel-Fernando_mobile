import { useContext, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { UserCircle } from 'phosphor-react-native';
import { PHOTO_SERVICE_HOST } from '@env';

import { styles } from './styles';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';
import { TextInput } from '../../components/TextInput';
import Button from '../../components/Button';
import ImagePicker from '../../components/ImagePicker';
import { File } from '../../model/File';

function NewPost() {
  const { profile } = useContext(AuthContext);
  const { createPost } = useContext(PostContext);
  const [newPostData, setNewPostData] = useState({ title: '', description: '', isImage: false });
  const [image, setImage] = useState<File>();
  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const handlePostSubmit = () => {
    newPostData.isImage = image ? true : false;

    if (newPostData.title.length < 3) {
      setErrorTitle('O título do Post deve ter ao menos 3 caracteres');
    }

    if (newPostData.title.length < 3 && newPostData.isImage) {
      return;
    }

    if (!newPostData.isImage && newPostData.description.length < 3) {
      setErrorDescription('A descrição do Post deve ter ao menos 3 caracteres');
      return;
    }

    createPost(newPostData, image ? image : null)
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {profile.photoUri != '' ?
          <Image
            source={{ uri: profile.photoUri.replace('localhost', PHOTO_SERVICE_HOST) }}
            style={styles.profilePhoto}
          />
          : <UserCircle color='white' weight='thin' size={48} />
        }
        <Text style={styles.usernameText}>{profile.name}</Text>
      </View>
      <View style={styles.postForm}>
        <Text style={styles.captionText}>Título do Post</Text>
        <TextInput.Root>
          <TextInput.Input
            value={newPostData.title}
            onChangeText={(value) => {
              setNewPostData({ ...newPostData, title: value });
              setErrorTitle('');
            }}
            placeholder='Digite o título do Post'
          />
        </TextInput.Root>
        {errorTitle && <Text style={styles.textError}>{errorTitle}</Text>}
        {image ? '' : (
          <>
            <Text style={styles.captionText}>Descrição do Post</Text>
            <TextInput.Root>
              <TextInput.Input
                value={newPostData.description}
                onChangeText={(value) => {
                  setNewPostData({ ...newPostData, description: value });
                  setErrorDescription('');
                }}
                placeholder='Digite a descrição do Post'
              />
            </TextInput.Root>
            {errorDescription && <Text style={styles.textError}>{errorDescription}</Text>}
          </>
        )}
        <ImagePicker onFileLoaded={setImage} />
        <View style={styles.buttonContainer}>
          <Button
            width={360}
            title='Postar'
            onPress={() => handlePostSubmit()}
          />
        </View>
      </View>
    </View>
  );
}

export default NewPost;
