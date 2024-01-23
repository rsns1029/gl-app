import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AvatarImg from './AvatarImg.tsx';

interface vuserProps {
  avatar: string;
  username: string;
}

const Container = styled.View`
  align-items: center;
`;

const UserName = styled.Text`
  color: ${props => props.theme.fontColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

export default function VUser({avatar, username}: vuserProps) {
  return (
    <TouchableOpacity
      onPress={() => console.log('logs here for rendering profile image')}>
      <Container>
        <AvatarImg avatarPath={avatar} />
        <UserName>
          {username.slice(0, 10)}
          {username.length > 10 ? '...' : null}
        </UserName>
      </Container>
    </TouchableOpacity>
  );
}
