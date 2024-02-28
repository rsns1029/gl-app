import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../shared/shared.types.ts';
import useMe from '../hooks/useMe';

const Container = styled.SafeAreaView`
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
  font-weight: 400px;
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
  font-weight: 400px;
`;

const CompleteButtonText = styled.Text`
  color: ${props => props.theme.fontColor};
  font-size: 14px;
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

  return (
    <Container>
      <Header>
        <CancelButton onPress={() => navigation.goBack()}>
          <Text />
        </CancelButton>
        <CompleteButton onPress={() => navigation.goBack()}>
          <CompleteButtonText>완료</CompleteButtonText>
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
        <InputLabel>username</InputLabel>
        <TextInputStyled placeholder="name" defaultValue={meData?.me.username} />
      </InputContainer>

      <InputContainer>
        <InputLabel>email</InputLabel>
        <TextInputStyled placeholder="email" defaultValue={meData?.me.email} />
      </InputContainer>

      <InputContainer>
        <InputLabel>Instagram Username</InputLabel>
        <TextInputStyled placeholder="Instagram Username" />
      </InputContainer>

      <InputContainer>
        <InputLabel>Self-Introduction</InputLabel>
        <TextInputStyled placeholder="Self-Introduction" />
      </InputContainer>

      <ActionsContainer>
        <ActionText>프로페셔널 계정으로 전환</ActionText>
        <ActionText>개인정보 설정</ActionText>
      </ActionsContainer>
    </Container>
  );
};

export default EditProfile;
