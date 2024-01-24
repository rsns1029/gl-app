import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';

interface EditProfileProps {
  route: {
    params: {
      name: string;
      accountName: string;
      profileImage: any; // Replace 'any' with the appropriate image type
    };
  };
  navigation: any; // Replace 'any' with the appropriate navigation type
}

const Container = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
  background-color: white;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-color: white;
`;

const CancelButton = styled(TouchableOpacity)``;

const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const CompleteButton = styled(TouchableOpacity)``;

const ProfileImageContainer = styled(View)`
  padding: 20px;
  align-items: center;
`;

const ProfileImage = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  border-color: white;
`;

const ProfileImageText = styled(Text)`
  color: white;
  margin-top: 10px;
`;

const InputContainer = styled(View)`
  padding: 10px;
`;

const InputLabel = styled(Text)`
  opacity: 0.5;
`;

const TextInputStyled = styled(TextInput)`
  font-size: 16px;
  border-bottom-width: 1px;
  border-color: #cdcdcd;
`;

const ActionsContainer = styled(View)`
  margin-vertical: 5px;
  padding: 10px;
`;

const ActionText = styled(Text)`
  margin-vertical: 5px;
  padding: 10px;
  color: #3493d9;
`;

const EditProfile: React.FC<EditProfileProps> = ({route, navigation}) => {
  const {name, accountName, profileImage} = route.params;

  return (
    <Container>
      <Header>
        <CancelButton onPress={() => navigation.goBack()}>
          <Text>취소</Text>
        </CancelButton>
        <Title>프로필 수정</Title>
        <CompleteButton onPress={() => navigation.goBack()}>
          <Text style={{color: '#3493D9'}}>완료</Text>
        </CompleteButton>
      </Header>

      <ProfileImageContainer>
        <ProfileImage source={profileImage} />
        <ProfileImageText>프로필 사진 바꾸기</ProfileImageText>
      </ProfileImageContainer>

      <InputContainer>
        <InputLabel>이름</InputLabel>
        <TextInputStyled placeholder="이름" defaultValue={name} />
      </InputContainer>

      <InputContainer>
        <InputLabel>사용자 이름</InputLabel>
        <TextInputStyled placeholder="사용자 이름" defaultValue={accountName} />
      </InputContainer>

      <InputContainer>
        <InputLabel>웹사이트</InputLabel>
        <TextInputStyled placeholder="웹사이트" />
      </InputContainer>

      <InputContainer>
        <InputLabel>소개</InputLabel>
        <TextInputStyled placeholder="소개" />
      </InputContainer>

      <ActionsContainer>
        <ActionText>프로페셔널 계정으로 전환</ActionText>
        <ActionText>개인정보 설정</ActionText>
      </ActionsContainer>
    </Container>
  );
};

export default EditProfile;
