import {gql} from '@apollo/client';

gql`
  mutation EditProfile($password: String) {
    editProfile(password: $password) {
      error
      ok
    }
  }
`;
