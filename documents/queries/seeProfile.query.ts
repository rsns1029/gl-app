import {gql} from 'graphql-tag';

gql`
  query SeeProfile($seeProfileId: Int!) {
    seeProfile(id: $seeProfileId) {
      id
      photos {
        id
        file
      }
      username
    }
  }
`;
