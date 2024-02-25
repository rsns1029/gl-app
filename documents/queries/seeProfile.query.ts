import {gql} from 'graphql-tag';

gql`
  query SeeProfile($seeProfileId: Int!) {
    seeProfile(id: $seeProfileId) {
      id
      username
      followers {
        id
        username
      }
      following {
        id
        username
      }
    }
  }
`;
