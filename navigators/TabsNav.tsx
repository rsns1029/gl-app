import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EmptyScreen from '../screens/EmptyScreen';
import TabIcon from '../components/nav/TabIcon';
import {useTheme} from 'styled-components';
import MapScreen from '../screens/MapScreen';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import {colors} from '../colors';

const Tabs = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

const ProfileStackScreen: React.FC = () => {
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
        tabBarInactiveTintColor: 'grey',
      }}>
      <Tabs.Screen
        name="Matches"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon iconName={'heart'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        component={MapScreen}
        listeners={({navigation}) => {
          return {
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Map');
            },
          };
        }}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon iconName={'map'} color={color} focused={focused} />
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
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabIcon iconName={'person'} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
