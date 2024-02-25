import gql from 'graphql-tag';

gql`
  mutation updateLocation($lat: Float!, $lon: Float!) {
    updateLocation(lat: $lat, lon: $lon) {
      id
      ok
      error
    }
  }
`;
