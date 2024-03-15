import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {launchCamera, MediaType, PhotoQuality} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../shared/shared.types.ts';

type PhotoNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'StackPhotoNavigation'
>;
const TakePhoto = ({navigation}: PhotoNavigationProps) => {
  const [takenPhotoUri, setTakenPhotoUri] = useState('');

  // useEffect(() => {
  //   handleTakePhoto(); // 컴포넌트가 마운트될 때 사진 촬영 시작
  // }, []);

  const handleTakePhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo' as MediaType,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1 as PhotoQuality, // 이미지 품질을 0.5로 낮춤
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.uri || null;
        if (imageUri) {
          setTakenPhotoUri(imageUri);
          console.log(imageUri);
        } else {
          console.log('imageUri is null');
        }
      }
    });
  };
  const handleCancel = () => {
    setTakenPhotoUri('');
  };

  const handleUploadPhoto = () => {
    // Implement photo upload logic here
    console.log('Upload photo:', takenPhotoUri);
    // Navigate to next screen after upload
    navigation.navigate('StackUploadPhotoNavigation', {
      photoUri: takenPhotoUri,
    });
  };

  return (
    <View style={{flex: 1}}>
      {takenPhotoUri === '' ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleTakePhoto} style={{padding: 20}}>
            <Ionicons name="camera" size={50} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Image
            source={{uri: takenPhotoUri}}
            style={{flex: 1}}
            resizeMode="contain"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <TouchableOpacity onPress={handleCancel}>
              <Ionicons name="close-circle" size={40} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUploadPhoto}>
              <Text style={{fontSize: 20, color: 'blue'}}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default TakePhoto;
