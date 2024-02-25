import gql from 'graphql-tag';

export const MAP_UPDATES = gql`
  subscription MapUpdates($generalLat: Float!, $generalLon: Float!) {
    mapUpdates(generalLat: $generalLat, generalLon: $generalLon) {
      userId
      lat
      lon
    }
  }
`;
