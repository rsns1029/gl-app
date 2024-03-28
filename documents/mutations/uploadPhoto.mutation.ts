import gql from 'graphql-tag';

gql`
  mutation UploadPhoto($ufile: Upload!) {
    uploadPhoto(ufile: $ufile) {
      id
      file
      user {
        id
        username
        avatar
      }
    }
  }
`;
