import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {logUserOut} from '../apollo';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';

// Assuming navigation is of a certain type, e.g., from react-navigation
// You should replace 'NavigationType' with the actual type based on your navigation library
type RootStackParamList = {
  Home: undefined; // 예시로 Home 화면을 정의
  Details: {itemId: number}; // Details 화면에는 itemId 파라미터가 필요
  // 다른 화면 타입들을 여기에 추가
};

type EmptyScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>; // 'Home'은 현재 화면의 이름
};
const EmptyScreen: React.FC<EmptyScreenProps> = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await logUserOut();
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={handleLogout}
        style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}>
        <Text style={{color: 'white'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyScreen;
