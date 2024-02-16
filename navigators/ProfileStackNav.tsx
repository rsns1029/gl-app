import {colorModeVar} from '../apollo';
import {useReactiveVar} from '@apollo/client';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Followers from '../screens/Followers.tsx';
import Following from '../screens/Following.tsx';
import EditProfile from '../screens/EditProfile';

const Stack = createStackNavigator();

const ProfileStackNav = () => {
  const isDarkMode: 'light' | 'dark' = useReactiveVar(colorModeVar);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDarkMode === 'light' ? 'white' : 'black',
        },
        headerTintColor: isDarkMode === 'light' ? 'black' : 'white',
      }}>
      <Stack.Screen name="StackProfile" component={Profile} />
      <Stack.Screen
        name="StackFollowers"
        component={Followers}
        options={{headerTitle: '팔로워'}}
      />
      <Stack.Screen
        name="StackFollowing"
        component={Following}
        options={{headerTitle: '팔로잉'}}
      />
      <Stack.Screen
        name="StackEditProfile"
        component={EditProfile}
        options={{headerTitle: '프로필 수정'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNav;
