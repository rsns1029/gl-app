import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EmptyScreen from '../screens/EmptyScreen';
import TabIcon from '../components/nav/TabIcon';
import {useTheme} from 'styled-components/native';
import {createStackNavigator} from '@react-navigation/stack';
import EditProfile from '../screens/EditProfile';
import {colors} from '../colors';
import styled from 'styled-components/native';
import Profile from '../screens/Profile';

const Tabs = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

const StyledContainer = styled.View`
  flex: 1;
`;

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

const TabsNav: React.FC = () => {
  const theme = useTheme();

  return (
    <StyledContainer>
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
          backgroundColor: theme.bgColor,
        }}>
        <Tabs.Screen
          name="LiveMap"
          component={EmptyScreen}
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
              event.preventDefault();
              navigation.navigate('Messages');
            },
          })}
          options={{
            tabBarIcon: ({focused, color, size}) => (
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
    </StyledContainer>
  );
};

export default TabsNav;
