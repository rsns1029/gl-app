// import Followers from '../screens/Followers';
// import Following from '../screens/Following';
import {useEffect} from 'react';
import {colorModeVar} from '../apollo';
import {useReactiveVar} from '@apollo/client';
import {RootStackParamList} from '../shared/shared.types';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Profile from '../screens/Profile';

type ProfileNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'StackProfileNavigation'
>;

const Stack = createStackNavigator();

const ProfileStackNav = ({navigation, route}: ProfileNavigationProps) => {
  const isDarkMode: 'light' | 'dark' = useReactiveVar(colorModeVar);

  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDarkMode === 'light' ? 'white' : 'black',
        },
        headerTintColor: isDarkMode === 'light' ? 'black' : 'white',
      }}>
      <Stack.Screen
        name="StackProfile"
        component={Profile}
        initialParams={route.params}
      />
      {/*<Stack.Screen*/}
      {/*  name="StackFollowers"*/}
      {/*  component={Followers}*/}
      {/*  options={{headerTitle: '팔로워'}}*/}
      {/*/>*/}
      {/*<Stack.Screen*/}
      {/*  name="StackFollowing"*/}
      {/*  component={Following}*/}
      {/*  options={{headerTitle: '팔로잉'}}*/}
      {/*/>*/}
    </Stack.Navigator>
  );
};

export default ProfileStackNav;
