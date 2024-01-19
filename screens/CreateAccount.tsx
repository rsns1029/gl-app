import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StepOne from './SignUp/StepOne';
import StepTwo from './SignUp/StepTwo';
import StepThree from './SignUp/StepThree';
import StepFour from './SignUp/StepFour';
import {SignUpAppContextProvider} from './SignUp/SignUpContext';
import {TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ConditionStep from './SignUp/ConditionStep';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../shared/shared.types';

type CreateAccountProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateAccount'
>;

const Stack = createStackNavigator();

export default function CreateAccount({navigation}: CreateAccountProps) {
  return (
    <SignUpAppContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTintColor: 'white',
          headerTitle: 'Create Account',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  marginTop: 20,
                  marginLeft: 10,
                  height: 40,
                  width: 40,
                }}
                onPress={() => {
                  Alert.alert(
                    'Are you sure?',
                    'Are you sure you want to go back? Any unsaved changes will be lost.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                      },
                      {
                        text: 'OK',
                        onPress: () => navigation.navigate('Welcome'),
                      },
                    ],
                  );
                }}>
                <Icon
                  name="chevron-left"
                  size={20}
                  style={{color: '#808080'}}
                />
              </TouchableOpacity>
            );
          },
        }}>
        <Stack.Screen name="StepOne" component={StepOne} />
        <Stack.Screen name="StepTwo" component={StepTwo} />
        <Stack.Screen name="StepThree" component={StepThree} />
        <Stack.Screen name="StepFour" component={StepFour} />
        <Stack.Screen name="ConditionStep" component={ConditionStep} />
      </Stack.Navigator>
    </SignUpAppContextProvider>
  );
}
