import Loading from './Loading';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../shared/shared.types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../generated/graphql';
import useMe from '../hooks/useMe';
import {useState} from 'react';

type UserItemNavigationProps = NativeStackNavigationProp<RootStackParamList>;

interface UserItemProps {
  id: number;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const UserContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 10px;
`;

const UserInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const Username = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.fontColor};
  font-size: 15px;
  margin-bottom: 5px;
`;

const Name = styled.Text`
  font-weight: bold;
  color: gray;
  font-size: 14px;
`;

const FollowButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.activeColor};
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
`;

const FollowButtonText = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.fontColor};
`;

const UserItem = ({username, avatar, isFollowing, id}: UserItemProps) => {
  const navigation = useNavigation<UserItemNavigationProps>();
  const {data: meData} = useMe();

  const [followState, setFollowState] = useState(isFollowing);

  const [followUserMutation, {loading: followUserLoading}] =
    useFollowUserMutation({
      update: (cache, {data}) => {
        if (data?.followUser.ok === false) {
          console.log('follow not ok, error : ', data?.followUser.error);
          return;
        }
        if (data?.followUser.ok === true) {
          console.log('followUser is ok');
          cache.modify({
            id: `User:${id}`,
            fields: {
              isFollowing: () => isFollowing,
              totalFollowers: (totalFollowers: number = 0) =>
                totalFollowers + 1,
            },
          });
          cache.modify({
            id: `User:${meData?.me.id}`,
            fields: {
              totalFollowing: (totalFollowing: number = 0) =>
                totalFollowing + 1,
            },
          });
        }
      },
    });
  const [unfollowUserMutation, {loading: unfollowUserLoading}] =
    useUnfollowUserMutation({
      update: (cache, {data}) => {
        if (data?.unfollowUser.ok === false) {
          return;
        }

        if (data?.unfollowUser.ok === true) {
          console.log('unfollowUser is ok');
          cache.modify({
            id: `User:${data?.unfollowUser.id}`,
            fields: {
              isFollowing: (isFollowing: boolean) => false,
              totalFollowers: (totalFollowers: number) => totalFollowers - 1,
            },
          });
          cache.modify({
            id: `User:${meData?.me.id}`,
            fields: {
              totalFollowing: (totalFollowing: number) => totalFollowing - 1,
            },
          });
        }
      },
    });

  const handleNavigateToProfileNavigation = (): void => {
    navigation.navigate('StackProfileNavigation');
  };

  const handleToggleFollow = async (
    isFollowing: boolean,
    username: string,
    id: number,
    followState: boolean,
  ): Promise<void> => {
    console.log('handleToggleFollow 들어옴 ....');
    if (followUserLoading === true || unfollowUserLoading === true) {
      return;
    }
    if (followState === false) {
      console.log('isFollowing is false, ', id);
      const followUserId = id;
      await followUserMutation({variables: {followUserId}});
    } else {
      console.log('isFollowing is true, ', id);
      await unfollowUserMutation({variables: {username}});
    }

    setFollowState(!followState);
  };

  return (
    <Container>
      <UserContainer onPress={handleNavigateToProfileNavigation}>
        {avatar ? (
          <UserAvatar source={{uri: avatar}} />
        ) : (
          <UserAvatar source={require('../assets/basic_user.jpeg')} />
        )}
        <UserInfoContainer>
          <Username>{username}</Username>
          {/*<Name>{name}</Name>*/}
        </UserInfoContainer>
      </UserContainer>
      <FollowButton
        onPress={() =>
          handleToggleFollow(isFollowing, username, id, followState)
        }>
        <FollowButtonText>
          <FollowButtonText>
            {followUserLoading === true || unfollowUserLoading === true ? (
              <Loading />
            ) : followState ? (
              'Unfollow'
            ) : (
              'follow'
            )}
          </FollowButtonText>
        </FollowButtonText>
      </FollowButton>
    </Container>
  );
};

export default UserItem;
