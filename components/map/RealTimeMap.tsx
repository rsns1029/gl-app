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
import {
  Location,
  SelectLocationsQuery,
  useSelectLocationsQuery,
} from '../../generated/graphql.ts';
import useMe from '../../hooks/useMe.tsx';
import MapScreenLayout from './MapScreenLayOut.tsx';
import {LOCATION_FRAGMENT} from '../../fragments.tsx';
import gql from 'graphql-tag';

interface RealTimeMapProps {
  latitude: number;
  longitude: number;
}

interface LocationDataProps {
  selectLocations: {
    id: number;
    locations: Array<Location> | null;
  };
}

const SEE_LOCATIONS_QUERY = gql`
  query SelectLocations($lat: Float!, $lon: Float!) {
    selectLocations(lat: $lat, lon: $lon) {
      id
      locations {
        ...LocationParts
      }
    }
  }
  ${LOCATION_FRAGMENT}
`;

export default function RealTimeMap({latitude, longitude}: RealTimeMapProps) {
  const client: ApolloClient<Object> = useApolloClient();
  const [subscribed, setSubscribed] = useState(false);
  const {data: meData} = useMe();
  console.log('meData : ', meData);

  console.log(latitude, longitude);

  // const {
  //   data: realTimeData,
  //   loading: realTimeLoading,
  //   error: realTimeError,
  // } = useSubscription(MAP_UPDATES, {
  //   variables: {
  //     generalLat: latitude,
  //     generalLon: longitude,
  //   },
  // });

  const {
    data: locationData,
    loading: initialLoading,
    subscribeToMore,
  } = useQuery<LocationDataProps>(SEE_LOCATIONS_QUERY, {
    variables: {lat: latitude, lon: longitude},
    fetchPolicy: 'network-only',
  });

  const initialRegion: Region = {
    latitude: latitude || 0,
    longitude: longitude || 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    if (locationData) {
      console.log('locationData from here:', locationData);
      client.writeQuery({
        query: SEE_LOCATIONS_QUERY,
        data: locationData,
        variables: {lat: latitude, lon: longitude},
      });
    }
  }, [locationData, latitude, longitude, client]);

  useEffect(() => {
    if (locationData && !subscribed) {
      console.log('subscribed to more');
      subscribeToMore({
        document: MAP_UPDATES,
        variables: {
          generalLat: latitude,
          generalLon: longitude,
        },
        updateQuery: (prevQuery: SelectLocationsQuery, options: any): any => {
          // console.log('update Query : ', options);
          const {
            subscriptionData: {
              data: {mapUpdates: realTimeLocation},
            },
          } = options;
          console.log('realTimeLocation.userId  : ', realTimeLocation.userId);
          const locationFragment = client.cache.writeFragment({
            fragment: LOCATION_FRAGMENT,
            data: realTimeLocation,
          });

          console.log('locationFragment : ', locationFragment);
          const cacheId = client.cache.identify({
            __typename: 'Location',
            userId: realTimeLocation.userId,
          });
          console.log(`LocationRoom:${locationData.selectLocations.id}`);
          client.cache.modify({
            id: `LocationRoom:${locationData.selectLocations.id}`,
            fields: {
              locations(prev) {
                const existingLocation = prev.find(
                  (aLocation: any) => aLocation.__ref === cacheId,
                );
                console.log('existingLocation : ', existingLocation);
                console.log(
                  'locationFragment.__ref : ',
                  locationFragment?.__ref,
                );
                if (existingLocation) {
                  return prev;
                }
                return [...prev, locationFragment];
              },
            },
          });
        },
      });
      setSubscribed(true);
    }
  }, [locationData, subscribed]);

  return (
    <MapScreenLayout loading={initialLoading}>
      <MapView
        style={{flex: 1}}
        region={initialRegion}
        showsUserLocation={true}
        customMapStyle={customMapStyle}>
        {locationData &&
          meData &&
          locationData.selectLocations &&
          locationData.selectLocations.locations &&
          locationData.selectLocations.locations.map(
            location =>
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
