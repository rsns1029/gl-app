import Loading from '../components/Loading';
import styled from 'styled-components/native';
import {logUserOut} from '../apollo';
import React, {useState} from 'react';
import {RootStackParamList} from '../shared/shared.types';
import {FlatList, useWindowDimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSeeProfileQuery} from '../generated/graphql';
import useMe from '../hooks/useMe.tsx';

type ProfileNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'MyProfile'
>;

const Container = styled.View`
  background-color: ${props => props.theme.bgColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProfileContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const TopContainer = styled.View`
  padding: 15px 10px;
  padding-bottom: 0;
`;

const BottomContainer = styled.View`
  flex: 1;
`;

const UserContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const AvatarContainer = styled.View``;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;

const UserInfoContainer = styled.View<{width: number}>`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: ${props => props.width - 120}px;
`;

const PostContainer = styled.View`
  align-items: center;
`;

const FollowerContainer = styled.TouchableOpacity`
  align-items: center;
`;

const FollowingContainer = styled.TouchableOpacity`
  align-items: center;
`;

const CommonNumber = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${props => props.theme.fontColor};
`;

const CommonText = styled.Text`
  font-size: 15px;
  margin-top: 2px;
  color: ${props => props.theme.fontColor};
`;

const UserActionContainer = styled.View`
  padding: 13px 10px;
`;

const Username = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const Bio = styled.Text`
  font-size: 15px;
  margin-top: 3px;
`;

const Buttons = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const LeftActionButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.activeColor};
  padding: 10px 12px;
  border-radius: 5px;
  font-size: 14px;
  flex: 1;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  height: 38px;
`;

const LeftActionButtonText = styled.Text`
  font-weight: bold;
  color: white;
`;

const RightAction = styled.TouchableOpacity`
  background-color: ${props => props.theme.bgContainerColor};
  border: ${props => props.theme.borderColor};
  padding: 10px 12px;
  border-radius: 5px;
  font-size: 14px;
  flex: 1;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  height: 38px;
`;

const RightActionText = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.fontColor};
`;

const FlatListContainer = styled(FlatList)`
  width: 100%;
`;

const ProfilePhotoContainer = styled.TouchableOpacity``;

const ProfilePhoto = styled.Image<{width: number}>`
  width: ${props => props.width / 3}px;
  height: ${props => props.width / 3}px;
`;

const AvatarText = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${props => props.theme.fontColor};
  text-align: center;
  margin-top: 15px;
`;

const Profile = ({navigation}: ProfileNavigationProps) => {
  const {width} = useWindowDimensions();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {data: meData} = useMe();

  const {data} = useSeeProfileQuery({
    variables: {
      seeProfileId: meData?.me.id, // 프로필 ID를 변수로 전달합니다.
    },
  });

  // data의 타입이 SeeProfileQuery에 맞게 정의됩니다.
  const seeProfileLoading = true;
  // test
  const seeProfileData = null;
  const handleNavigateToStackRoomsNavigation = null;
  const isMe = true;
  const handleNavigateToFollowersScreen = (): void => {
    navigation.navigate('StackFollowers', {});
  };
  const handleNavigateToFollowingScreen = (): void => {
    navigation.navigate('StackFollowing', {});
  };

  const handleNavigateToEditProfileScreen = (): void => {
    navigation.navigate('StackEditProfile', {});
  };

  // const handleNavigateToStackRoomsNavigation = (): void => {
  //   navigation.navigate('StackRoomsNavigation');
  // };
  //
  // const handleNavigateToPhotoScreen = (photoId: number): void => {
  //   navigation.navigate('StackPhoto', {photoId});
  // };

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({item: photo}: any) => {
    return (
      <ProfilePhotoContainer
        /*onPress={() => handleNavigateToPhotoScreen(photo.id)}>*/
        onPress={() => {
          /* 아무 동작 없음 */
        }}>
        <ProfilePhoto width={width} source={{uri: photo.file}} />
      </ProfilePhotoContainer>
    );
  };

  return (
    <Container>
      {!seeProfileLoading ? (
        <Loading />
      ) : (
        <ProfileContainer>
          <TopContainer>
            <UserContainer>
              <AvatarContainer>
                {meData?.me.avatar ? (
                  <Avatar source={{uri: meData.me.avatar}} />
                ) : (
                  <Avatar source={require('../assets/basic_user.jpeg')} />
                )}
                <AvatarText>{data?.seeProfile?.username}</AvatarText>
              </AvatarContainer>
              <UserInfoContainer width={width}>
                <PostContainer>
                  <CommonNumber>{meData?.me?.photos?.length ?? 0}</CommonNumber>
                  <CommonText>Post</CommonText>
                </PostContainer>
                <FollowerContainer onPress={handleNavigateToFollowersScreen}>
                  <CommonNumber>{meData?.me.followersCount ?? 0}</CommonNumber>
                  <CommonText>Follower</CommonText>
                </FollowerContainer>
                <FollowingContainer onPress={handleNavigateToFollowingScreen}>
                  <CommonNumber>{meData?.me.followingCount ?? 0}</CommonNumber>
                  <CommonText>Following</CommonText>
                </FollowingContainer>
              </UserInfoContainer>
            </UserContainer>
            <UserActionContainer>
              {/*<Username>{meData?.me.username}</Username>*/}
              {/*<Bio>{seeProfileData?.seeProfile.user?.bio}</Bio>*/}
              <Buttons>
                {/*{route.params?.isMe === true ? (*/}
                {isMe === true ? (
                  <LeftActionButton onPress={handleNavigateToEditProfileScreen}>
                    <LeftActionButtonText>Edit Profile</LeftActionButtonText>
                  </LeftActionButton>
                ) : (
                  <LeftActionButton disabled={true}>
                    <LeftActionButtonText>
                      {/*{followUserLoading === true ||*/}
                      {/*unfollowUserLoading === true ? (*/}
                      {/*  <Loading />*/}
                      {/*) : seeProfileData?.seeProfile.user?.isFollowing ? (*/}
                      {/*  '팔로우 취소'*/}
                      {/*) : (*/}
                      {/*  '팔로우'*/}
                      {/*)}*/}
                    </LeftActionButtonText>
                  </LeftActionButton>
                )}
                {/*{route.params?.isMe === true ? (*/}
                {isMe === true ? (
                  <RightAction onPress={logUserOut}>
                    <RightActionText>Logout</RightActionText>
                  </RightAction>
                ) : (
                  <RightAction>
                    <RightActionText>메시지</RightActionText>
                  </RightAction>
                )}
              </Buttons>
            </UserActionContainer>
          </TopContainer>
          <BottomContainer>
            <FlatListContainer
              key={'#'}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              refreshing={refreshing}
              onRefresh={onRefresh}
              data={meData?.me.photos}
              renderItem={renderItem}
              keyExtractor={(photo: any) => String(photo.id)}
            />
          </BottomContainer>
        </ProfileContainer>
      )}
    </Container>
  );
};

export default Profile;
