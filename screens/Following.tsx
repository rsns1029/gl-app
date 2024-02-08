import styled from 'styled-components/native';
import UserItem from '../components/UserItem';
import {useState} from 'react';
import {FlatList} from 'react-native';
import {useSeeProfileQuery} from '../generated/graphql';
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

const Followering = ({route}: FolloweringProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {data: meData} = useMe();

  const {refetch} = useSeeProfileQuery({
    variables: {
      seeProfileId: meData?.me.id, // 프로필 ID를 변수로 전달합니다.
    },
  });
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
        data={route.params?.following}
        renderItem={renderItem}
        keyExtractor={(following: any) => String(following.id)}
      />
    </Container>
  );
};

export default Followering;
