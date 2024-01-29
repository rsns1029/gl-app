import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from 'styled-components';

export default function EmptyScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.bgColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: theme.fontColor}}>Empty</Text>
    </View>
  );
}
