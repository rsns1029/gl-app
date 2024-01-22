import React, {useEffect, useContext} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MediaType, PhotoQuality, launchCamera} from 'react-native-image-picker';
import AuthButton from '../../components/auth/AuthButton';
import styled from 'styled-components/native';
import {colors} from '../../colors';
import StepBar from './StepBar';
import {SignUpAppContext} from './SignUpContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../shared/shared.types';

type StepFourProps = NativeStackScreenProps<RootStackParamList, 'StepFour'>;

const BtnContainer = styled.View`
  width: 80%;
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 100px;
`;

const IconContainer = styled.View`
  flex: 4;
  align-items: center;
  width: 80%;
`;

const SkipTouchableOpacity = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${colors.green};
  border-radius: 3px;
  padding: 15px 10px;
`;

const SkipLink = styled.Text`
  color: ${colors.green};
  font-weight: 600;
  text-align: center;
`;

const ExplainText = styled.Text`
  color: ${props => props.theme.fontColor};
  font-size: 25px;
  margin-bottom: 10px;
  align-self: baseline;
  align-content: center;
`;

const SubExplainText = styled.Text`
  color: ${props => props.theme.fontColor};
  font-size: 15px;
  margin-bottom: 10px;
  align-self: baseline;
  width: 90%;
`;

const RemoveIconTouchable = styled.TouchableOpacity`
  z-index: 2;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  margin-top: 5px;
  align-items: center;
`;

export default function StepFour({navigation}: StepFourProps) {
  const {avatarUri, setAvatarUri} = useContext(SignUpAppContext);

  const handleRemoveAvatar = () => {
    console.log('default');
    setAvatarUri(null);
  };

  const handleNext = (nextPage: keyof RootStackParamList) => {
    navigation.navigate(nextPage);
  };

  const HeaderBar = () => (
    <StepBar currentStep={4} onBeforeNavigate={handleNext} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderBar,
    });
  }, []);

  const handleAvatarPress = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo' as MediaType,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1.0 as PhotoQuality,
    };

    // ImagePicker.showImagePicker(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //     const source = {uri: response.uri};
    //     setAvatarUri(source.uri);
    //   }
    // });
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.uri || null;
        setAvatarUri(imageUri);
        console.log(imageUri);
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
      }}>
      <IconContainer>
        <ExplainText>Add Your Profile Picture</ExplainText>
        <SubExplainText>
          Adding a face picture lets other users recognize you better. Your
          profile picture will be shown to everybody
        </SubExplainText>
        <TouchableOpacity onPress={handleAvatarPress}>
          <View
            style={{
              height: 200,
              width: 200,
              borderRadius: 175,
              backgroundColor: 'gray',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginTop: 15,
              zIndex: 0,
            }}>
            {avatarUri ? (
              <Image
                source={{uri: avatarUri}}
                style={{height: 200, width: 200, backgroundColor: 'blue'}}
              />
            ) : (
              <Icon name="person" size={80} color="white" />
            )}
          </View>
        </TouchableOpacity>
        {avatarUri && (
          <RemoveIconTouchable onPress={handleRemoveAvatar}>
            <Icon name="close-circle" size={40} color="white" />
          </RemoveIconTouchable>
        )}
      </IconContainer>

      <BtnContainer>
        <AuthButton
          text={avatarUri ? 'Create Account' : 'Add Picture'}
          onPress={
            avatarUri ? () => handleNext('ConditionStep') : handleAvatarPress
          }
        />
        <SkipTouchableOpacity
          onPress={
            avatarUri ? handleAvatarPress : () => handleNext('ConditionStep')
          }>
          <SkipLink>{avatarUri ? 'Edit Photo' : 'Skip'}</SkipLink>
        </SkipTouchableOpacity>
      </BtnContainer>
    </View>
  );
}
