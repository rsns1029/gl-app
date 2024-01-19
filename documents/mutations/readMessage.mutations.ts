import gql from "graphql-tag";

gql`
  mutation readMessage($id: Int!) {
    readMessage(id: $id) {
      ok
      error
    }
  }
`;
