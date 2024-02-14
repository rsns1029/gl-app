import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthButton from '../../components/auth/AuthButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useForm} from 'react-hook-form';
import {SignUpAppContext} from './SignUpContext';
import {ReactNativeFile} from 'apollo-upload-client';
import {
  CreateAccountMutation,
  useCreateAccountMutation,
} from '../../generated/graphql';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../shared/shared.types';

type ConditionStepProps = NativeStackScreenProps<
  RootStackParamList,
  'ConditionStep'
>;

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${props => props.theme.fontColor};
`;

const TextWrapper = styled.View`
  margin-bottom: 20px;
`;

const Text = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.fontColor};
`;

const IndentedText = styled(Text)`
  margin-left: 5px;
`;

const BtnContainer = styled.View`
  width: 80%;
  align-items: baseline;
`;

const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  color: ${props => props.theme.fontColor};
`;

const CheckBoxText = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.fontColor};
`;

const CheckBox = styled.View`
  width: 28px;
  height: 28px;
  border-width: 1px;
  border-color: ${props => props.theme.fontColor};
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const CheckBoxIcon = styled(Icon)`
  color: ${props => props.theme.fontColor};
  font-size: 20px;
`;

export default function ConditionStep({navigation}: ConditionStepProps) {
  const [agree, setAgree] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const [createAccountMutation, {loading}] = useCreateAccountMutation({
    onCompleted: (data: CreateAccountMutation): void => {
      const {
        createAccount: {ok, error},
      } = data;
      const {username, password} = getValues();
      console.log(username, password);
      console.log('navigating');
      if (ok) {
        navigation.navigate('StackLogin', {
          username,
          password,
        });
      } else {
        console.log('error :  ', error);
      }
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();

  const onValid = async () => {
       
    // if (!agree) {
    //   setErrorMsg('Please, Agree the term');
    //   return;
    // }
    if (!loading) {
      const {
        username,
        password,
        sex,
        interestingSex,
        birthDay,
        phoneNo,
        email,
        instaUsername,
        avatar,
      } = getValues();
      console.log(username)
      await createAccountMutation({
        variables: {
          username,
          password,
          sex,
          interestingSex,
          birthDay,
          phoneNo,
          email,
          instaUsername,
          avatar,
        },
      });
    }
  };

  const {
    username,
    password,
    email,
    sex,
    interestingSex,
    birthDay,
    avatarUri,
    phoneNo,
    instaUsername,
  } = useContext(SignUpAppContext);

  useEffect(() => {
    setValue('username', username);
    setValue('password', password);
    setValue('email', email);
    setValue('phoneNo', phoneNo);
    setValue('sex', sex);
    const [yearStr, monthStr, dayStr] = birthDay.split('/');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    const birthDayDate = new Date(year, month - 1, day).toISOString();
    setValue('birthDay', birthDayDate);

    if (avatarUri) {
      const file = new ReactNativeFile({
        uri: avatarUri,
        name: `${username}-avatar.jpg`,
        type: 'image/jpeg',
      });
      setValue('avatar', file);
    }

    setValue('instaUsername', instaUsername);
    setValue('interestingSex', interestingSex);
  }, []);

  useEffect(() => {
    register('username', {
      required: true,
    });

    register('password', {
      required: true,
    });

    register('email', {
      required: false,
    });

    register('phoneNo', {
      required: false,
    });

    register('sex', {
      required: true,
    });

    register('interestingSex', {
      required: false,
    });

    register('instaUsername', {
      required: false,
    });

    register('birthDay', {
      required: true,
    });

    register('avatar', {
      required: false,
    });
  }, [register]);

  return (
    <AuthLayout>
      <Container>
        <Title>Terms and Conditions</Title>
        <TextWrapper>
          <Text>
            By using this app, you agree to the following terms and conditions:
          </Text>
          <IndentedText>
            - You will not use this app for any illegal or unauthorized purpose.
          </IndentedText>
          <IndentedText>
            - You will not harass, bully, or intimidate other users of this app.
          </IndentedText>
          <IndentedText>
            - You will not post any content that is hateful, violent, or
            discriminatory.
          </IndentedText>
          <IndentedText>
            - You will not share any personal information of other users without
            their consent.
          </IndentedText>
          <IndentedText>
            - You will comply with all applicable laws and regulations.
          </IndentedText>
        </TextWrapper>

        <BtnContainer>
          <CheckBoxContainer>
            <TouchableOpacity
              onPress={() => {
                setAgree(!agree);
                setErrorMsg('');
              }}>
              <CheckBox>
                {agree ? <CheckBoxIcon name="check" /> : null}
              </CheckBox>
            </TouchableOpacity>
            <CheckBoxText>I agree to the terms and conditions</CheckBoxText>
          </CheckBoxContainer>
          {errorMsg !== '' && (
            <Text style={{color: 'red', marginBottom: 10}}>{errorMsg}</Text>
          )}
          {errors && Object.keys(errors)[0] && (
            <Text style={{color: 'red'}}>
              {Object.keys(errors)[0]} is required
            </Text>
          )}
          <AuthButton onPress={handleSubmit(onValid)} text="Create Account" />
        </BtnContainer>
      </Container>
    </AuthLayout>
  );
}
