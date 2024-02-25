import React, {useEffect, useState} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client, {colorModeVar, isLoggedInVar, tokenVar} from './apollo.tsx';
import {ApolloProvider, useReactiveVar} from '@apollo/client';
import {ThemeProvider} from 'styled-components/native';
import {darkTheme, lightTheme} from './styles/themes.ts';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import LoggedInNav from './navigators/LoggedInNav.tsx';
import LoggedOutNav from './navigators/LoggedOutNav.tsx';
import {apolloDevToolsInit} from 'react-native-apollo-devtools-client';
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';

function App(): React.JSX.Element | null {
  const [ready, setReady] = useState<boolean>(false);
  const colorMode: 'light' | 'dark' = useReactiveVar(colorModeVar);
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);

  const preload = async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem('token');
    // await AsyncStorage.removeItem('token');
    if (token) {
      tokenVar(token);
      return true;
    } else {
      tokenVar('');
      // logUserOut().catch(error => console.log(error));
    }
    return false;
  };

  useEffect(() => {
    console.log(isLoggedIn);
    preload()
      .then(loggedIn => {
        isLoggedInVar(loggedIn);
        const colorSchemeName: ColorSchemeName = Appearance.getColorScheme();
        colorModeVar(colorSchemeName === 'light' ? 'light' : 'dark');
        setReady(true);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    Appearance.addChangeListener(({colorScheme}) => {
      if (colorScheme === 'dark') {
        colorModeVar('dark');
      } else {
        colorModeVar('light');
      }
    });
  }, [colorMode]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorMode === 'dark' ? '#000000' : '#FFFFFF',
    },
  };

  if (!ready) {
    // return error page here
    return null;
  }

  if (__DEV__) {
    // Adds messages only in a dev environment
    console.log('dev env');
    loadDevMessages();
    loadErrorMessages();
    // apolloDevToolsInit(client); // apollo cache tool plugin. delete this later
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={colorMode === 'light' ? lightTheme : darkTheme}>
        <NavigationContainer theme={MyTheme}>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
