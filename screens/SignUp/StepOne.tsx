import React, {useState, useEffect, useContext} from 'react';
import {Text, View} from 'react-native';
import AuthButton from '../../components/auth/AuthButton';
import AuthLayout from '../../components/auth/AuthLayout';
import {TextInput} from '../../components/auth/AuthShared';
import StepBar from './StepBar';
import {SignUpAppContext} from './SignUpContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CreateAccountValidPage,
  RootStackParamList,
} from '../../shared/shared.types';
import {useValidCreateAccountLazyQuery} from '../../generated/graphql';
import {GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

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

  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId: '200851602419-5ebei1h581bd4d93ccpehak6pkuiobk3.apps.googleusercontent.com',
    });
  };

  const [executeQuery, {loading}] = useValidCreateAccountLazyQuery({
    onCompleted: data => {
      if (data?.validCreateAccount?.ok) {
        console.log(data);
        setReservedUsername(username);
        setValidated(true);
        setErrorMsg('');
        if (data.validCreateAccount.nextPage) {
          navigation.navigate(
            data.validCreateAccount.nextPage as CreateAccountValidPage,
          );
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
      navigation.navigate(nextPage as CreateAccountValidPage);
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

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const userInfo = await GoogleSignin.signIn();
      console.log("구글 토큰: ", idToken);

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      console.log("Email: ", userInfo.user.email);
      console.log("UserId: ", userInfo.user.id);
      console.log("UserInfo: ", userInfo.user);
      setUsername(userInfo.user.email);
      setPassword(userInfo.user.id);
      setRepassword(userInfo.user.id);
      handleGoogleNext('StepTwo')
    } catch (error) {
      console.error("Google 로그인 실패:", error);
      setErrorMsg("Fail")
    }
  }

  const handleGoogleNext = async (nextPage: keyof RootStackParamList) => {
    
    setValidated(true);
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
    googleSigninConfigure();
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
      <View style={{ width: '85%', alignSelf: 'center'}}>
        <AuthButton
          text="Next"
          disabled={false}
          loading={loading}
          onPress={async () => handleNext('StepTwo')}
        />
      </View>
      <View style={{marginBottom: 150, width: '85%', alignSelf: 'center'}}>
      <GoogleSigninButton
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      />
      </View>
    </AuthLayout>
  );
}
