import React, { useState } from 'react';
import { Image, View } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';

import Button from '../Button';
import { File } from '../../model/File';

interface PostImageProps {
  onFileLoaded: (file: File) => void;
}

export default function ImagePicker({ onFileLoaded }: PostImageProps) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri);

      const name = uri.match(/[^\\/]+$/)[0];

      const file = {
        name,
        uri,
        type: 'image/jpg',
      };

      onFileLoaded(file);
    }
  };

  return (
    <View style={{ paddingTop: 12, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        width={240}
        title={image ? 'Trocar foto' : 'Selecionar foto'}
        onPress={pickImage}
      />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 16 }} />}
    </View>
  );
}
