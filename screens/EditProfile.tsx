import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, Text} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../shared/shared.types.ts';
import useMe from '../hooks/useMe';
import {useEditProfileMutation} from '../generated/graphql';

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-color: white;
`;

const CancelButton = styled.TouchableOpacity``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.fontColor};
`;

const CompleteButton = styled.TouchableOpacity``;

const ProfileImageContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  border-color: white;
`;

const ProfileImageText = styled.Text`
  color: ${props => props.theme.activeColor};
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
`;

const InputContainer = styled.View`
  padding: 10px;
`;

const InputLabel = styled.Text`
  color: ${props => props.theme.fontColor};
  font-size: 14px;
`;

const TextInputStyled = styled.TextInput`
  color: ${props => props.theme.fontColor};
  font-size: 16px;
  border-bottom-width: 1px;
  border-color: #cdcdcd;
`;

const ActionsContainer = styled.View`
  margin-vertical: 5px;
  padding: 10px;
`;

const ActionText = styled.Text`
  margin-vertical: 5px;
  color: #3493d9;
  font-weight: 400;
`;

const CompleteButtonText = styled.Text`
  color: ${props => props.theme.fontColor};
  font-size: 14px;
  font-weight: bold;
`;

type EditProfileNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'StackEditProfile'
>;

export interface EditProfileProps {
  name: string;
  accountName: string;
  profileImage: any;
  color?: string;
}

const EditProfile = ({route, navigation}: EditProfileNavigationProps) => {
  const {data: meData} = useMe();

  const [currentPasswordValue, setCurrentPasswordValue] = useState<string>('');
  // 새 비밀번호
  const [newPasswordValue, setNewPasswordValue] = useState<string>('');
  // 새 비밀번호 확인
  const [confirmNewPasswordValue, setConfirmNewPasswordValue] =
    useState<string>('');

  // 새 비밀번호 이벤트
  const onChangeNewPassword = useCallback((text: string) => {
    setNewPasswordValue(text);
    console.log('new password : ', text);
  }, []);

  // 새 비밀번호 확인 이벤트
  const onChangeConfirmNewPassword = useCallback(
    (text: string) => {
      setConfirmNewPasswordValue(text);
      console.log('confirm new password', text);
    },
    [newPasswordValue],
  );

  const [editProfileMutation, {data}] = useEditProfileMutation({
    variables: newPasswordValue,
  });

  const handleComplete = useCallback(() => {
    if (!currentPasswordValue) {
      Alert.alert('Error', 'Please enter a Current Password');
      return;
    }
    if (!newPasswordValue) {
      Alert.alert('Error', 'Please enter a New Password');
      return;
    }

    if (!confirmNewPasswordValue) {
      Alert.alert('Error', 'Please enter a Confirm New Password');
      return;
    }

    /**
     * current password check 로직 필요(modify edit profile resolver)
     */
    if (newPasswordValue === confirmNewPasswordValue) {
      // 새 비밀번호와 확인 비밀번호가 일치하는 경우
      editProfileMutation({variables: {password: newPasswordValue}});
    } else {
      // 새 비밀번호와 확인 비밀번호가 일치하지 않는 경우
      Alert.alert('Error', 'Passwords do not match');
    }
  }, [newPasswordValue, confirmNewPasswordValue, editProfileMutation]);

  useEffect(() => {
    if (data?.editProfile?.ok) {
      console.log('Password updated successfully');
      navigation.goBack(); // 예시로 뒤로 가기
    } else {
      console.log('error : ', data?.editProfile.error);
    }
  }, [data, navigation]);

  return (
    <ScrollView>
      <Container>
        <Header>
          <CancelButton onPress={() => navigation.goBack()}>
            <Text />
          </CancelButton>
          <CompleteButton onPress={handleComplete}>
            <CompleteButtonText>Complete</CompleteButtonText>
          </CompleteButton>
        </Header>
        <ProfileImageContainer>
          {meData?.me.avatar ? (
            <ProfileImage source={{uri: meData.me.avatar}} />
          ) : (
            <ProfileImage source={require('../assets/basic_user.jpeg')} />
          )}
          <ProfileImageText>Edit Avatar</ProfileImageText>
        </ProfileImageContainer>

        <InputContainer>
          <InputLabel>Username</InputLabel>
          <TextInputStyled
            placeholder="name"
            defaultValue={meData?.me.username}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel>Password</InputLabel>
          <TextInputStyled
            placeholder="Current Password"
            value={currentPasswordValue}
            secureTextEntry={true} // 비밀번호 입력 시 암호화하여 표시
          />
        </InputContainer>

        <InputContainer>
          <InputLabel>New Password</InputLabel>
          <TextInputStyled
            placeholder="New Password"
            value={newPasswordValue}
            onChangeText={onChangeNewPassword}
            secureTextEntry={true} // 비밀번호 입력 시 암호화하여 표시
          />
        </InputContainer>

        <InputContainer>
          <InputLabel>Confirm New Password</InputLabel>
          <TextInputStyled
            placeholder="Confirm New Password"
            value={confirmNewPasswordValue}
            onChangeText={onChangeConfirmNewPassword}
            secureTextEntry={true} // 비밀번호 입력 시 암호화하여 표시
          />
        </InputContainer>

        <ActionsContainer>
          <ActionText>프로페셔널 계정으로 전환</ActionText>
          <ActionText>개인정보 설정</ActionText>
        </ActionsContainer>
      </Container>
    </ScrollView>
  );
};

export default EditProfile;
