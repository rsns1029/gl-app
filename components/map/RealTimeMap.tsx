import React, {useEffect, useState} from 'react';
import MapView, {Marker, Region} from 'react-native-maps';
import {customMapStyle} from '../../styles/mapStyle.ts';
import {
  ApolloClient,
  useApolloClient,
  useQuery,
  useSubscription,
} from '@apollo/client';
import {MAP_UPDATES} from '../../documents/subscriptions/mapUpdates.subscription.ts';
import {Location, useSelectLocationsQuery} from '../../generated/graphql.ts';
import useMe from '../../hooks/useMe.tsx';
import MapScreenLayout from './MapScreenLayOut.tsx';
import gql from 'graphql-tag';
// import {LOCATION_FRAGMENT} from '../../fragments.tsx';

interface RealTimeMapProps {
  latitude: number;
  longitude: number;
}

const LOCATION_FRAGMENT = gql`
  fragment LocationFields on Location {
    __typename
    userId
    lat
    lon
  }
`;
//
// const SEE_LOCATIONS_QUERY = gql`
//   query SelectLocations($lat: Float!, $lon: Float!) {
//     selectLocations(lat: $lat, lon: $lon) {
//       ...LocationParts
//     }
//   }
//   ${LOCATION_FRAGMENT}
// `;

interface LocationDataProps {
  selectLocations: Array<Location> | null;
}

export default function RealTimeMap({latitude, longitude}: RealTimeMapProps) {
  const client: ApolloClient<Object> = useApolloClient();

  const {data: meData} = useMe();

  const {
    data: realTimeData,
    loading: realTimeLoading,
    error: realTimeError,
  } = useSubscription(MAP_UPDATES, {
    variables: {
      generalLat: latitude,
      generalLon: longitude,
    },
  });
  const {data: locationData, loading: initialLoading} = useSelectLocationsQuery(
    {
      variables: {
        lat: latitude,
        lon: longitude,
      },
      fetchPolicy: 'network-only',
    },
  );

  // const {data: locationData, loading: initialLoading} =
  //   useQuery<LocationDataProps>(SEE_LOCATIONS_QUERY, {
  //     variables: {
  //       lat: latitude,
  //       lon: longitude,
  //     },
  //     fetchPolicy: 'network-only',
  //   });

  const initialRegion: Region = {
    latitude: latitude || 0,
    longitude: longitude || 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    console.log('realTimeData : ', realTimeData);
    console.log('locationData : ', locationData);
    if (realTimeData && realTimeData.mapUpdates) {
      const {userId, lat, lon} = realTimeData.mapUpdates;
      const locationId = client.cache.identify({
        __typename: 'Location',
        userId,
      });

      console.log('userId : ', userId);
    }
  }, [realTimeData, client]);

  return (
    <MapScreenLayout loading={initialLoading}>
      <MapView
        style={{flex: 1}}
        region={initialRegion}
        showsUserLocation={true}
        customMapStyle={customMapStyle}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="You are here"
        />
        {locationData &&
          locationData.selectLocations &&
          locationData.selectLocations.map(
            location =>
              !location.userId === meData?.me?.id &&
              location.lat &&
              location.lon && (
                <Marker
                  key={location.userId} // userId가 키 -> apollo.tsx 에서 캐쉬 설정 필요
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lon,
                  }}
                  title={`User ID: ${location.userId}`}
                />
              ),
          )}
      </MapView>
    </MapScreenLayout>
  );
}
