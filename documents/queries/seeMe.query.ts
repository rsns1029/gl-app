import {gql} from 'graphql-tag';

gql`
  query SeeMe {
    me {
      username
      id
    }
  }
`;
