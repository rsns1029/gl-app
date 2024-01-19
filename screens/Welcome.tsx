import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../colors';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../shared/shared.types';

type WelComeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const LoginLink = styled.Text`
  color: ${colors.green};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
`;

export default function Welcome({navigation}: WelComeProps) {
  const goToCreateAccount = () => navigation.navigate('CreateAccount');
  const goToLogIn = () => navigation.navigate('StackLogin');

  return (
    <Container>
      <View style={{flex: 1}} />
      <AuthLayout>
        <AuthButton
          text="Create New Account"
          disabled={false}
          onPress={goToCreateAccount}
        />
        <TouchableOpacity onPress={goToLogIn}>
          <LoginLink>Log In</LoginLink>
        </TouchableOpacity>
      </AuthLayout>
      <View style={{flex: 1}} />
    </Container>
  );
}
