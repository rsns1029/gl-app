import React, {useEffect, useContext, useState} from 'react';
import {SignUpAppContext} from './SignUpContext';
import AuthButton from '../../components/auth/AuthButton';
import AuthLayout from '../../components/auth/AuthLayout';
import styled, {css} from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StepBar from './StepBar';
import {colors} from '../../colors';
import {RootStackParamList} from '../../shared/shared.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type stepTwoProps = NativeStackScreenProps<RootStackParamList, 'StepTwo'>;

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 10px;
`;

const BtnContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 100px;
  width: 85%;
  align-self: center;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
  align-self: center;
`;

const GenderIcon = styled(Icon)`
  margin-bottom: 10px;
`;

const ButtonLabel = styled.Text<{isSelected: boolean}>`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;

  ${props =>
    props.isSelected &&
    css`
      color: #000;
    `}
`;

interface GenderButtonProps {
  icon: 'mars' | 'venus';
  label: string;
  onPress: () => void;
  isSelected: boolean;
}

const Button = styled.TouchableOpacity<{
  isSelected: boolean;
  onPress: () => void;
}>`
  align-items: center;
  background-color: grey;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  width: 40%;

  ${props =>
    props.isSelected &&
    css`
      background-color: ${colors.green};
    `}
`;

const GenderButton = ({
  icon,
  label,
  onPress,
  isSelected,
}: GenderButtonProps) => {
  return (
    <Button isSelected={isSelected} onPress={onPress}>
      <GenderIcon name={icon} size={80} color={isSelected ? '#000' : '#fff'} />
      <ButtonLabel isSelected={isSelected}>{label}</ButtonLabel>
    </Button>
  );
};

export default function StepTwo({navigation}: stepTwoProps) {
  const {sex, setSex} = useContext(SignUpAppContext);
  const [selectedGender, setSelectedGender] = useState(sex);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenderSelection = (g: string) => {
    setSelectedGender(g);
    setSex(g);
    setErrorMsg('');
  };

  const handleNext = (nextPage: keyof RootStackParamList) => {
    console.log(sex);
    if (sex == null || sex == '') {
      setErrorMsg('Please, select the gender');
      return false;
    }
    navigation.navigate(nextPage);
  };

  const HeaderBar = () => (
    <StepBar currentStep={2} onBeforeNavigate={handleNext} />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderBar,
    });
  }, [sex]);

  return (
    <AuthLayout>
      <Container>
        <GenderButton
          icon="mars"
          label="Male"
          onPress={() => handleGenderSelection('M')}
          isSelected={selectedGender === 'M'}
        />
        <GenderButton
          icon="venus"
          label="Female"
          onPress={() => handleGenderSelection('F')}
          isSelected={selectedGender === 'F'}
        />
      </Container>
      {errorMsg !== '' && <ErrorText>{errorMsg}</ErrorText>}
      <BtnContainer>
        <AuthButton
          text="Next"
          disabled={false}
          onPress={() => handleNext('StepThree')}
        />
      </BtnContainer>
    </AuthLayout>
  );
}
