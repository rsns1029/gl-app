import gql from "graphql-tag";

export const ROOM_UPDATES = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        id
        username
        avatar
      }
      read
    }
  }
`;
