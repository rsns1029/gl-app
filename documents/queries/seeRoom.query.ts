import gql from "graphql-tag";

gql`
  query SeeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
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
  }
`;
