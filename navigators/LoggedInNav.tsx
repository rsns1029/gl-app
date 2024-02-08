import React from 'react';
import TabsNav from './TabsNav';
import MessagesNav from './MessagesNav';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'styled-components';
import ProfileStackNav from './ProfileStackNav';
import useMe from '../hooks/useMe';

const Nav = createStackNavigator();

export default function LoggedInNav() {
  const theme = useTheme();
  const {data: meData} = useMe();

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
    </Nav.Navigator>
  );
}
