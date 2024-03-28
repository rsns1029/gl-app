import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘 사용
import GoogleSignInComponent, {onGoogleButtonPress} from './GoogleLogin';
import InstagramLoginScreen from './InstaLogin';

// Google 로그인과 Instagram 로그인을 처리하는 함수들
// (예: onGoogleButtonPress, onInstagramButtonPress)은 여기에 정의하거나 임포트해야 합니다.

const SocialLoginButtons = () => {
  return (
    <View style={styles.buttonContainer}>
      {/* Google 로그인 버튼 */}

      <GoogleSignInComponent />
      {/* Instagram 로그인 버튼 */}
      <InstagramLoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row', // 버튼들을 수평 방향으로 나열
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // 하단 여백 추가
    padding: 10,
  },
});

export default SocialLoginButtons;
