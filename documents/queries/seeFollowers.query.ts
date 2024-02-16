import {gql} from 'graphql-tag';

gql`
  query SeeFollowers($page: Int!) {
    seeFollowers(page: $page) {
      error
      followers {
        id
        username
        avatar
        isFollowing
      }
      ok
      totalPages
    }
  }
`;
