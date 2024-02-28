import styled from 'styled-components/native';
import UserItem from '../components/UserItem';
import {useState} from 'react';
import {FlatList} from 'react-native';
import {
  useSeeFollowersQuery,
  useSeeFollowingQuery,
  useSeeProfileQuery,
} from '../generated/graphql';
import {RootStackParamList} from '../shared/shared.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useMe from '../hooks/useMe.tsx';

type FolloweringProps = NativeStackScreenProps<
  RootStackParamList,
  'StackFollowing'
>;

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.bgColor};
`;

const FlatListContainer = styled(FlatList)`
  width: 100%;
`;

const Username = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.fontColor};
  font-size: 15px;
  margin-bottom: 5px;
`;

const Followering = ({route}: FolloweringProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {data: meData} = useMe();

  const {data, refetch} = useSeeFollowingQuery({
    variables: {
      page: 1,
    },
  });

  console.log(data?.seeFollowing.ok);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({item: following}: any) => {
    return <UserItem {...following} />;
  };

  return (
    <Container>
      <FlatListContainer
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seeFollowing?.following}
        renderItem={renderItem}
        keyExtractor={(following: any) => String(following.id)}
      />
    </Container>
  );
};

export default Followering;
