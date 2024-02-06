import Button from '../components/profile/Buttton';
import styled from 'styled-components/native';
import {useEffect} from 'react';
import {Text} from 'react-native';
import {logUserOut} from '../apollo';
import {RootStackParamList} from '../shared/shared.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useMe from '../hooks/useMe';

type MeNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'StackProfile'
>;

const Container = styled.View`
  background-color: ${props => props.theme.bgColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Me = ({navigation}: MeNavigationProps) => {
  const {data} = useMe();

  useEffect(() => {
    if (data && data.me) {
      // Assuming that the user data is inside the 'me' field
      navigation.setOptions({
        headerTitle: `${data.me.name}(@${data.me.username})`,
      });
    }
  }, []);
  return (
    <Container>
      <Text style={{color: 'white'}}>Me</Text>
      <Button
        onPress={logUserOut}
        text="로그아웃"
        size="14px"
        bgFill={true}
        loading={false}
        disabled={false}
      />
    </Container>
  );
};

export default Me;
