import React from 'react';
import TabsNav from './TabsNav';
import MessagesNav from './MessagesNav';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'styled-components';
import ProfileStackNav from './ProfileStackNav';
import {RootStackParamList} from '../shared/shared.types.ts';
import UploadPhotoNav from './UploadPhotoNav';

const Nav = createStackNavigator<RootStackParamList>();

export default function LoggedInNav() {
  const theme = useTheme();

  return (
    <Nav.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: theme.bgColor},
        animationEnabled: false,
      }}>
      <Nav.Screen
        name="TabNav"
        options={{headerShown: false}}
        // Pass MyTheme object as a prop to TabsNav component
        component={TabsNav}
      />
      <Nav.Screen
        name="StackMessagesNav"
        options={{headerShown: false}}
        component={MessagesNav}
      />
      <Nav.Screen
        name="StackProfileNavigation"
        options={{headerShown: false}}
        component={ProfileStackNav}
      />
      <Nav.Screen
        name="StackPhotoNavigation"
        options={{headerShown: false}}
        component={UploadPhotoNav}
      />
    </Nav.Navigator>
  );
}
