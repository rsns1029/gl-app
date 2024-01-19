import gql from "graphql-tag";

gql`
  query ValidCreateAccount($username: String, $nextPage: String) {
    validCreateAccount(username: $username, nextPage: $nextPage) {
      ok
      error
      nextPage
    }
  }
`;
