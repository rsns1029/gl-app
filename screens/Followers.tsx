import styled from 'styled-components/native';
import UserItem from '../components/UserItem';
import {useState} from 'react';
import {FlatList} from 'react-native';
import {useSeeFollowersQuery} from '../generated/graphql';
import {RootStackParamList} from '../shared/shared.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type FollowersProps = NativeStackScreenProps<
  RootStackParamList,
  'StackFollowers'
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

const Followers = ({route}: FollowersProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {data, refetch} = useSeeFollowersQuery({
    variables: {
      page: 1,
    },
  });

  console.log(data?.seeFollowers.ok);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({item: followers}: any) => {
    return <UserItem {...followers} />;
  };

  return (
    <Container>
      <FlatListContainer
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seeFollowers?.followers}
        renderItem={renderItem}
        keyExtractor={(follower: any) => String(follower.id)}
      />
    </Container>
  );
};

export default Followers;
