import React, {useState, useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import AuthButton from '../../components/auth/AuthButton';
import AuthLayout from '../../components/auth/AuthLayout';
import {TextInput} from '../../components/auth/AuthShared';
import StepBar from './StepBar';
import {SignUpAppContext} from './SignUpContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, validSignUpPages} from '../../shared/shared.types';
import {useValidCreateAccountLazyQuery} from '../../generated/graphql';

type StepOneProps = NativeStackScreenProps<RootStackParamList, 'StepOne'>;
export default function StepOne({navigation}: StepOneProps) {
  const {username, setUsername} = useContext(SignUpAppContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { reservedUsername, setReservedUsername } = useContext(SignUpAppContext); // prettier-ignore
  const {password, setPassword} = useContext(SignUpAppContext);
  const {repassword, setRepassword} = useContext(SignUpAppContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [validated, setValidated] = useState(false);

  const handleInputChange = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ): void => {
    setFunction(value);
    setValidated(false);
  };

  const [executeQuery, {loading}] = useValidCreateAccountLazyQuery({
    onCompleted: data => {
      if (data?.validCreateAccount?.ok) {
        console.log(data);
        setReservedUsername(username);
        setValidated(true);
        setErrorMsg('');
        if (
          data.validCreateAccount.nextPage &&
          validSignUpPages(data.validCreateAccount.nextPage)
        ) {
          navigation.navigate(data.validCreateAccount.nextPage);
        }
      } else {
        setErrorMsg('Username already exists');
        setReservedUsername('');
        setValidated(false);
      }
    },
    onError: error => {
      console.log(error);
      setErrorMsg('Network issue');
    },
  });

  const handleNext = async (nextPage: keyof RootStackParamList) => {
    if (validated) {
      navigation.navigate(nextPage);
      return true;
    }

    if (username === '') {
      setErrorMsg('Please write username');
      setActiveInput('username');
      return false;
    }
    if (password === '') {
      setErrorMsg('Please write password');
      setActiveInput('password');
      return false;
    }
    if (repassword === '') {
      setErrorMsg('Please rewrite password');
      setActiveInput('repassword');
      return false;
    }
    if (password !== repassword) {
      setErrorMsg('Passwords not matched. Please write your password again');
      setActiveInput('repassword');
      return false;
    }
    await executeQuery({
      variables: {username, nextPage},
    });
  };

  const HeaderBar = () => (
    <StepBar
      currentStep={1}
      onBeforeNavigate={handleNext} // temp onBeforeNavigate={handleNext}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderBar,
    });
  }, []);

  const [activeInput, setActiveInput] = useState<
    'username' | 'password' | 'repassword'
  >('username');

  return (
    <AuthLayout>
      <View style={{marginBottom: 50}}>
        <TextInput
          placeholder="User Name"
          returnKeyType="next"
          onSubmitEditing={() => setActiveInput('password')}
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          onChangeText={text => handleInputChange(setUsername, text)}
          autoFocus={activeInput === 'username'}
        />
        <TextInput
          placeholder="Password"
          returnKeyType="next"
          onSubmitEditing={() => setActiveInput('repassword')}
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          onChangeText={text => handleInputChange(setPassword, text)}
          secureTextEntry
          autoFocus={activeInput === 'password'}
        />
        <TextInput
          placeholder="Enter your password again"
          returnKeyType="done"
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          onChangeText={text => handleInputChange(setRepassword, text)}
          lastOne={true}
          secureTextEntry
          autoFocus={activeInput === 'repassword'}
        />
        {errorMsg !== '' && (
          <Text style={{color: 'red', marginBottom: 10}}>{errorMsg}</Text>
        )}
      </View>
      <View style={{marginBottom: 150, width: '85%', alignSelf: 'center'}}>
        <AuthButton
          text="Next"
          disabled={false}
          loading={loading}
          onPress={async () => handleNext('StepTwo')}
        />
      </View>
    </AuthLayout>
  );
}
