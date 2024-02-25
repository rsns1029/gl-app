import {colorModeVar} from '../apollo';
import {useReactiveVar} from '@apollo/client';
import {ActivityIndicator} from 'react-native';

const Loading = () => {
  const isDarkMode: 'light' | 'dark' = useReactiveVar(colorModeVar);

  return (
    <ActivityIndicator
      color={isDarkMode === 'light' ? 'black' : 'white'}
      size={12}
    />
  );
};

export default Loading;
