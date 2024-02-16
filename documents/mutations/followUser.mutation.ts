import gql from 'graphql-tag';

gql`
  mutation FollowUser($followUserId: Int!) {
    followUser(id: $followUserId) {
      error
      ok
      id
    }
  }
`;
