import {useReactiveVar} from '@apollo/client';
import {ActivityIndicator} from 'react-native';
import {colorModeVar} from '../../apollo';

const Loading = () => {
  const colorMode: 'light' | 'dark' = useReactiveVar(colorModeVar);

  return (
    <ActivityIndicator
      color={colorMode === 'light' ? 'black' : 'white'}
      size={12}
    />
  );
};

export default Loading;
