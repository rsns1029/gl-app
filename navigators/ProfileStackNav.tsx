import React from 'react';
import Profile from '../screens/Profile.tsx';
import {colors} from '../colors.ts';
import EditProfile from '../screens/EditProfile.tsx';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../shared/shared.types.ts';

const ProfileStack = createStackNavigator<RootStackParamList>();

const ProfileStackNav: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="MyProfile"
        component={Profile}
        options={{
          headerShown: true,
          cardStyle: {backgroundColor: 'black'},
          headerTintColor: 'grey',
          headerStyle: {
            backgroundColor: colors.green,
          },
        }}
      />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNav;
