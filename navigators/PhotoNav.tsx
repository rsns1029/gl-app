import TakePhoto from '../screens/TakePhoto';
import {colorModeVar} from '../apollo';
import {useReactiveVar} from '@apollo/client';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoNav = () => {
  const isDarkMode: 'light' | 'dark' = useReactiveVar(colorModeVar);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDarkMode === 'light' ? 'white' : 'black',
        },
        tabBarActiveTintColor: isDarkMode === 'light' ? 'black' : 'white',
        tabBarIndicatorStyle: {
          backgroundColor: isDarkMode === 'light' ? 'black' : 'white',
          top: 0,
        },
      }}>
      {/*<Tab.Screen name="TabSelectPhoto" options={{title: '사진 선택'}}>*/}
      {/*  {() => (*/}
      {/*    <Stack.Navigator*/}
      {/*      screenOptions={{*/}
      {/*        headerBackTitleVisible: false,*/}
      {/*        headerStyle: {*/}
      {/*          backgroundColor: isDarkMode === 'light' ? 'white' : 'black',*/}
      {/*        },*/}
      {/*        headerTintColor: isDarkMode === 'light' ? 'black' : 'white',*/}
      {/*        headerBackImage: ({tintColor}) => (*/}
      {/*          <Icon name="close" color={tintColor} size={32} />*/}
      {/*        ),*/}
      {/*      }}>*/}
      {/*      <Stack.Screen*/}
      {/*        options={{title: '사진'}}*/}
      {/*        name="StackSelectPhoto"*/}
      {/*        component={SelectPhoto}*/}
      {/*      />*/}
      {/*    </Stack.Navigator>*/}
      {/*  )}*/}
      {/*</Tab.Screen>*/}
      <Tab.Screen
        name="TabTakePhoto"
        component={TakePhoto}
        options={{title: 'Take Photo'}}
      />
    </Tab.Navigator>
  );
};

export default PhotoNav;
