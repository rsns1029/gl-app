import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// GoogleSignin을 위한 설정
export const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId:
      '200851602419-5ebei1h581bd4d93ccpehak6pkuiobk3.apps.googleusercontent.com',
  });
};

export const onGoogleButtonPress = async (loginType = 'default') => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const userInfo = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    await auth().signInWithCredential(googleCredential);

    // switch (loginType) {
    //   case 'Login':
    //     setValue('username', userInfo.user.email);
    //     setValue('password', userInfo.user.id);
    //     handleSubmit(onValid)();
    //     break;
    //   case 'user':
    //     setUsername(userInfo.user.email);
    //     setPassword(userInfo.user.id);
    //     setRepassword(userInfo.user.id);
    //     setValidated(true);
    //     await handleGoogleNext('StepTwo');
    //     break;
    //   default:
    //     console.log('Default 로그인 처리');
    //   // 기본 로그인 처리
    // }

    console.log('Email: ', userInfo.user.email);
    console.log('UserId: ', userInfo.user.id);
    console.log('UserInfo: ', userInfo.user);

    // Google 로그인 성공 시 필요한 정보 반환
    return {
      email: userInfo.user.email,
      id: userInfo.user.id,
      validated: true,
    };
  } catch (error) {
    console.error('Google 로그인 실패:', error);
    // 오류 처리
    throw new Error('Google 로그인 실패');
  }
};

const GoogleSignInComponent = () => {
  useEffect(() => {
    googleSigninConfigure();
  }, []);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    width: 192,
    height: 48,
    marginRight: 10,
  },
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
});

export default GoogleSignInComponent;
