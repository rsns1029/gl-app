import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {RootStackParamList} from '../../shared/shared.types.ts';
import {StackNavigationProp} from '@react-navigation/stack';

interface ProfileButtonProps {
  id: number;
  name: string;
  accountName: string;
  profileImage: any; // Adjust the type based on your actual image type
}

const Container = styled.View`
  width: 100%;
`;

const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  background-color: white;
`;

const InnerContainer = styled.View`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border-color: #dedede;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  opacity: 0.8;
  color: black;
`;

const FollowButton = styled(TouchableOpacity)`
  width: 42%;
`;

const MessageButton = styled.View`
  width: 42%;
  height: 35px;
  border-width: 1px;
  border-color: #dedede;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const DownButton = styled.View`
  width: 10%;
  height: 35px;
  border-width: 1px;
  border-color: #dedede;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileButton: React.FC<ProfileButtonProps> = ({
  id,
  name,
  accountName,
  profileImage,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const [follow, setFollow] = useState<boolean>(false);

  return (
    <Container>
      {id === 0 ? (
        <ButtonContainer
          onPress={() =>
            navigation.push('EditProfile', {
              name: name,
              accountName: accountName,
              profileImage: profileImage,
              color: 'white',
            })
          }>
          <InnerContainer>
            <ButtonText>프로필 수정</ButtonText>
          </InnerContainer>
        </ButtonContainer>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <FollowButton onPress={() => setFollow(!follow)}>
            <InnerContainer
              style={{
                backgroundColor: follow ? undefined : '#3493D9',
                borderWidth: follow ? 1 : 0,
              }}>
              <Text style={{color: follow ? 'white' : 'white'}}>
                {follow ? '팔로잉' : '팔로우'}
              </Text>
            </InnerContainer>
          </FollowButton>
          <MessageButton>
            <Text style={{color: 'white'}}>메시지</Text>
          </MessageButton>
          <DownButton>
            <Feather
              name="chevron-down"
              style={{fontSize: 20, color: 'white'}}
            />
          </DownButton>
        </View>
      )}
    </Container>
  );
};

export default ProfileButton;
