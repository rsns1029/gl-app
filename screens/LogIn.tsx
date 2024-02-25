import {gql, useMutation} from '@apollo/client';
import React, {useEffect, useRef, FC, useState} from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import {TextInput} from '../components/auth/AuthShared';
import {useForm} from 'react-hook-form';
import AuthButton from '../components/auth/AuthButton';
import {logUserIn} from '../apollo';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import SocialLoginButtons from './Auth/SocialButton';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InstagramLoginScreen from './Auth/InstaLogin';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface LoginProps {
  route: {
    params: {
      username?: string;
      password?: string;
    };
  };
}

const Login: FC<LoginProps> = ({route: {params}}) => {
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '200851602419-5ebei1h581bd4d93ccpehak6pkuiobk3.apps.googleusercontent.com',
    });
  };

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      await auth().signInWithCredential(googleCredential);
      setValue('username', userInfo.user.email);
      setValue('password', userInfo.user.id);
      handleSubmit(onValid)();
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      console.error('Google 로그인 실패:', error);
    }
  }
  const [errorMsg, setErrorMsg] = useState('');

  const {register, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });

  const onCompleted = async (data: any) => {
    const {
      login: {ok, token, error},
    } = data;

    console.log('ok : ', ok);
    console.log('token : ', token);
    console.log('error : ', error);
    if (ok) {
      await logUserIn(token);
    }
  };

  const onValid = (data: any) => {
    setErrorMsg('');
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const [logInMutation, {loading}] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const passwordRef = useRef<any>();
  const onNext = (nextOne: any) => {
    //const onNext = (nextOne: React.RefObject<TextInput>) => {
    nextOne.current?.focus();
  };

  useEffect(() => {
    googleSigninConfigure();
    register('username', {
      required: true,
    });
    register('password', {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout logoMarginTop={150}>
      <TextInput
        value={watch('username')}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={text => setValue('username', text)}
      />
      <TextInput
        value={watch('password')}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={text => setValue('password', text)}
      />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch('username') || !watch('password')}
        onPress={handleSubmit(onValid)}
      />
      {/* <GoogleSigninButton
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress()
              .then(userInfo => {
                console.log('Signed in with Google!', userInfo);
              })
              .catch(error => console.error(error))
          }
          style={styles.google_button}>
          <View style={styles.iconWrapper}>
            <Icon name="google" size={24} color="#DB4437" />
          </View>
          <Text style={styles.text}>Login Google</Text>
        </TouchableOpacity>
        <InstagramLoginScreen />
      </View>
    </AuthLayout>
  );
};
const styles = StyleSheet.create({
  google_button: {
    flexDirection: 'row',
    backgroundColor: 'white', // 구글 버튼의 배경색
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconWrapper: {
    backgroundColor: 'white',
    marginRight: 10,
  },
  text: {
    color: '#DB4437',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // 버튼들을 수평 방향으로 나열
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // 하단 여백 추가
    padding: 10,
  },
});
export default Login;
