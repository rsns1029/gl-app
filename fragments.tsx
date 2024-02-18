import {gql} from '@apollo/client';

export const ROOM_FRAGMENT = gql`
  fragment RoomParts on Room {
    id
    unreadTotal
    users {
      id
      avatar
      username
    }
  }
`;

export const MATCH_FRAGMENT = gql`
  fragment MatchParts on User {
    id
    username
    avatar
    userStatus
  }
`;

export const LOCATION_FRAGMENT = gql`
  fragment LocationParts on Location {
    userId
    lon
    lat
  }
`;
