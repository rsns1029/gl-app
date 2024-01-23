import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../colors';
import {RootStackParamList} from '../../shared/shared.types';
import {ViewStyle} from 'react-native';

type StepBarProps = {
  currentStep: number;
  onBeforeNavigate: (nextPage: keyof RootStackParamList) => void;
  style?: ViewStyle;
};

const Container = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StepBtn = styled.TouchableOpacity`
  background-color: gray;
  border-radius: 10px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 70%;
`;

const Text = styled.Text`
  color: white;
  font-size: 17px;
`;

export default function StepBar({
  currentStep,
  style,
  onBeforeNavigate,
}: StepBarProps) {
  return (
    <Container style={style}>
      <StepBtn
        onPress={async () => onBeforeNavigate('StepOne')}
        style={{
          backgroundColor: currentStep === 1 ? colors.green : 'gray',
        }}>
        <Text> 1 </Text>
      </StepBtn>
      <StepBtn
        onPress={async () => onBeforeNavigate('StepTwo')}
        style={{
          backgroundColor: currentStep === 2 ? colors.green : 'gray',
        }}>
        <Text> 2 </Text>
      </StepBtn>
      <StepBtn
        onPress={async () => onBeforeNavigate('StepThree')}
        style={{
          backgroundColor: currentStep === 3 ? colors.green : 'gray',
        }}>
        <Text> 3 </Text>
      </StepBtn>
      <StepBtn
        onPress={async () => onBeforeNavigate('StepFour')}
        style={{
          backgroundColor: currentStep === 4 ? colors.green : 'gray',
        }}>
        <Text> 4 </Text>
      </StepBtn>
    </Container>
  );
}
