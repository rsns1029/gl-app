import gql from 'graphql-tag';

gql`
  query SelectLocations($lat: Float!, $lon: Float!) {
    selectLocations(lat: $lat, lon: $lon) {
      id
      locations {
        userId
        lat
        lon
      }
    }
  }
`;
