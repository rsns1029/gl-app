import Loading from '../components/Loading';
import styled from 'styled-components/native';
import KeyboardAvoidingLayout from '../components/KeyboardAvoidingLayout';
import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ReactNativeFile} from 'apollo-upload-client';
import {RootStackParamList} from '../shared/shared.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useUploadPhotoMutation} from '../generated/graphql';

type UploadPhotoNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'StackUploadPhotoNavigation'
>;

interface UploadPhotoFormData {
  text: string;
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
`;

const Photo = styled.Image`
  flex: 0.9;
  flex: 1;
`;

const CaptionContainer = styled.View`
  margin-top: 10px;
  padding: 0 20px;
  position: absolute;
  bottom: 50px;
  width: 100%;
`;

const CaptionTextInput = styled.TextInput`
  background-color: ${props => props.theme.bgColor};
  padding: 12px 20px 12px 10px;
  border-radius: 5px;
  color: ${props => props.theme.fontColor};
`;

const HeaderRightContainer = styled.TouchableOpacity`
  padding: 10px 12px;
`;

const HeaderRightText = styled.Text`
  font-size: 17px;
  color: ${props => props.theme.activeColor};
  font-weight: bold;
`;

const UploadPhotoNav = ({navigation, route}: UploadPhotoNavigationProps) => {
  const {control, handleSubmit, getValues} = useForm<UploadPhotoFormData>();
  const [uploadPhotoMutation, {loading: uploadPhotoLoading}] =
    useUploadPhotoMutation();

  const handleUploadPhoto = async () => {
    try {
      const {data} = await uploadPhotoMutation({
        variables: {
          ufile: route.params?.photoUri, // photoUri를 업로드에 사용할 변수로 전달합니다.
        },
      });

      if (data?.uploadPhoto?.file) {
        // 업로드가 성공하면 해당 화면을 닫거나 다른 화면으로 이동할 수 있습니다.
        console.log('업로드 성공 ........ file : ', data?.uploadPhoto.file);
        navigation.navigate('MyProfile');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      // 업로드에 실패한 경우에 대한 처리를 추가할 수 있습니다.
    }
  };

  const onValid = (): void => {
    const {text} = getValues();
    if (text === '') {
      return;
    }
    const file: ReactNativeFile = new ReactNativeFile({
      uri: route.params?.photoUri,
      name: `${Date.now()}.jpg`,
      type: 'image/jpeg',
    });
    uploadPhotoMutation({variables: {ufile: file}});
  };

  useEffect(() => {
    navigation.setOptions({
      ...(uploadPhotoLoading === true && {headerLeft: () => null}),
      headerRight: () => {
        return (
          <HeaderRightContainer onPress={handleSubmit(onValid)}>
            {uploadPhotoLoading === true ? (
              <Loading />
            ) : (
              <HeaderRightText>업로드</HeaderRightText>
            )}
          </HeaderRightContainer>
        );
      },
    });
  }, [uploadPhotoLoading]);

  return (
    <KeyboardAvoidingLayout>
      <Container>
        <Photo source={{uri: route.params?.photoUri.toString()}} />
        <CaptionContainer>
          <Controller
            name="text"
            control={control}
            rules={{required: true, minLength: 1, maxLength: 100}}
            render={({field: {onChange, value}}) => (
              <CaptionTextInput
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(onValid)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                placeholder="사진에 대한 설명을 입력해주세요."
                placeholderTextColor="gray"
                blurOnSubmit={false}
                maxLength={100}
              />
            )}
          />
        </CaptionContainer>
      </Container>
    </KeyboardAvoidingLayout>
  );
};

export default UploadPhotoNav;
