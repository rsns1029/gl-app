import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EmptyScreen from '../screens/EmptyScreen';
import TabIcon from '../components/nav/TabIcon';
import {useTheme} from 'styled-components';
import MapScreen from '../screens/MapScreen';
import {RootStackParamList} from '../shared/shared.types.ts';
import ProfileStackNav from './ProfileStackNav.tsx';

const Tabs = createBottomTabNavigator<RootStackParamList>();

export default function TabsNav() {
  const theme = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.bgColor,
          borderTopColor: theme.fontColor,
        },
        tabBarActiveTintColor: theme.fontColor,
        tabBarInactiveTintColor: 'red',
      }}>
      <Tabs.Screen
        name="Matches"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon
              iconName={'heart'}
              color={theme.fontColor}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon
              iconName={'map'}
              color={theme.fontColor}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Chats"
        component={EmptyScreen}
        listeners={({navigation}) => ({
          tabPress: event => {
            // Prevent the default action (which would be opening the EmptyScreen)
            event.preventDefault();

            // Navigate to the desired screen instead
            navigation.navigate('StackMessagesNav');
          },
        })}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon
              iconName={'chatbox-ellipses'}
              color={theme.fontColor}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileStackScreen"
        component={ProfileStackNav}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon
              iconName={'person'}
              color={theme.fontColor}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
