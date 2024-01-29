import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {FlatList} from 'react-native';
import RoomItem from '../components/rooms/RoomItem';
import ScreenLayout from '../components/ScreenLayout';
import {MATCH_FRAGMENT, ROOM_FRAGMENT} from '../fragments';
import styled from 'styled-components/native';
import HList from '../components/users/HList';
import {Room} from '../generated/graphql.ts';
import {useTheme} from 'styled-components';

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

const SEE_MATCHES_QUERY = gql`
  query seeMatches {
    seeMatches {
      ...MatchParts
    }
  }
  ${MATCH_FRAGMENT}
`;

const ListTitle = styled.Text`
  color: ${props => props.theme.fontColor};
  font-size: 18px;
  margin-top: 20px;
  font-weight: 600;
  margin-left: 30px;
`;

const MarginTopContainer = styled.View`
  margin-top: 20px;
`;

const SeparatorView = styled.View`
  width: 90%;
  height: 1px;
  align-self: center;
  background-color: ${props => props.theme.separatorLineColor};
`;

const BigSeparatorView = styled.View`
  width: 95%;
  height: 3px;
  align-self: center;
  background-color: ${props => props.theme.separatorLineColor};
`;

const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyListText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.fontColor};
  margin-bottom: 15px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
`;

interface ChatDataProps {
  seeRooms: Array<Room> | null;
}

export default function Rooms() {
  const noDataImgSrc = require('../assets/noData.png');
  const theme = useTheme();
  console.log('see room 1 : ');

  const {data: chatData, loading: chatLoading} = useQuery<ChatDataProps>(
    SEE_ROOMS_QUERY,
    {
      fetchPolicy: 'network-only',
    },
  );

  const {data: matchData, loading: matchLoading} = useQuery(SEE_MATCHES_QUERY, {
    fetchPolicy: 'network-only',
  });

  const renderItem = ({item: room}: any) => <RoomItem {...room} />;

  const ChatListEmptyComponent = () => {
    if (chatData?.seeRooms?.length === 0) {
      return (
        <EmptyListContainer>
          <PostImage source={noDataImgSrc} resizeMode="contain" />
          <EmptyListText>Sorry, no chats found.</EmptyListText>
        </EmptyListContainer>
      );
    }
    return null;
  };

  const ListFooterComponent = () => {
    if (chatData?.seeRooms?.length !== 0) {
      return <SeparatorView />;
    }
    return null;
  };

  return (
    <ScreenLayout loading={matchLoading || chatLoading}>
      <FlatList
        ListHeaderComponent={
          <>
            {matchLoading ? null : matchData?.seeMatches ? (
              <MarginTopContainer>
                <HList title={'Matches'} data={matchData.seeMatches} />
                <BigSeparatorView />
              </MarginTopContainer>
            ) : null}
            <ListTitle>Chats</ListTitle>
          </>
        }
        ItemSeparatorComponent={SeparatorView}
        style={{width: '100%'}}
        data={chatData?.seeRooms}
        keyExtractor={room => '' + room.id}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ChatListEmptyComponent}
      />
    </ScreenLayout>
  );
}
