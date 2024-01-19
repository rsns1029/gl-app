import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../colors';

interface AuthButtonProps {
  onPress: () => void;
  disabled?: boolean;
  text: string;
  loading?: boolean;
}

const Button = styled.TouchableOpacity`
  background-color: ${colors.green};
  padding: 15px 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  color: ${colors.darkPurple};
  font-weight: 600;
  text-align: center;
`;

export default function AuthButton({
  onPress,
  disabled,
  text,
  loading,
}: AuthButtonProps) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}
