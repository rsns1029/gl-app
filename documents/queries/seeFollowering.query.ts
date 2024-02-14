import {gql} from 'graphql-tag';

gql`
  query SeeFollowing($page: Int!) {
    seeFollowing(page: $page) {
      error
      following {
        id
        username
      }
      ok
      totalPages
    }
  }
`;
