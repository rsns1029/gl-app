import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, Region} from 'react-native-maps';
import {customMapStyle} from '../../styles/mapStyle.ts';
import {
  ApolloCache,
  ApolloClient,
  FetchResult,
  useApolloClient,
  useQuery,
  useSubscription,
} from '@apollo/client';
import {MAP_UPDATES} from '../../documents/subscriptions/mapUpdates.subscription.ts';
import {
  Location,
  SelectLocationsQuery,
  UpdateLocationMutation,
  useSelectLocationsQuery,
  useUpdateLocationMutation,
} from '../../generated/graphql.ts';
import useMe from '../../hooks/useMe.tsx';
import MapScreenLayout from './MapScreenLayOut.tsx';
import {LOCATION_FRAGMENT} from '../../fragments.tsx';
import gql from 'graphql-tag';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';

interface RealTimeMapProps {
  initialLatitude: number;
  initialLongitude: number;
}

interface RealTimeLocationCoords {
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

export default function RealTimeMap({
  initialLatitude,
  initialLongitude,
}: RealTimeMapProps) {
  const checkingDigits: number = 4;
  const rerenderThreshHold: number = 0.03;
  const client: ApolloClient<Object> = useApolloClient();

  const [subscribed, setSubscribed] = useState(false);

  const parse = (num: number): number => {
    return parseFloat(num.toFixed(checkingDigits));
  };

  const [realTimeLocation, setRealTimeLocation] =
    useState<RealTimeLocationCoords>({
      latitude: parse(initialLatitude),
      longitude: parse(initialLongitude),
    });

  const [lastSelectPoint, setLastSelectPoint] =
    useState<RealTimeLocationCoords>({
      latitude: parse(initialLatitude),
      longitude: parse(initialLongitude),
    });

  const realTimeLocationRef = useRef(realTimeLocation);
  realTimeLocationRef.current = realTimeLocation;

  const {data: meData} = useMe();

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
    refetch,
    subscribeToMore,
  } = useQuery<LocationDataProps>(SEE_LOCATIONS_QUERY, {
    variables: {
      lat: parse(initialLatitude),
      lon: parse(initialLongitude),
    },
    fetchPolicy: 'network-only',
  });

  const initialRegion: Region = {
    latitude: initialLatitude || 0,
    longitude: initialLongitude || 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // useEffect(() => {
  //   if (locationData) {
  //     console.log('locationData from here:', locationData);
  //     client.writeQuery({
  //       query: SEE_LOCATIONS_QUERY,
  //       data: locationData,
  //       variables: {lat: initialLatitude, lon: initialLongitude},
  //     });
  //   }
  // }, [locationData, initialLatitude, initialLongitude, client]);

  const [updateLocationMutation, {loading: updatingLocation}] =
    useUpdateLocationMutation({
      onCompleted: (data: UpdateLocationMutation): void => {
        // console.log('---------------');
        // console.log(data);
        // console.log('---------------');
      },
    });

  useEffect(() => {
    if (locationData && !subscribed) {
      console.log('subscribed to more!!!!!!!!!!!!!!!!!!!');
      subscribeToMore({
        document: MAP_UPDATES,
        variables: {
          generalLat: initialLatitude,
          generalLon: initialLongitude,
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
    } else {
      console.log('Already Subscribed !!!!!!!!!!!!!!!!!!');
    }
  }, [locationData, subscribed]);

  useEffect(() => {
    console.log('Starting Real Time Map@@@@@@@@');

    let watchId: number | null = null;
    const watchRealTime = async () => {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      watchId = Geolocation.watchPosition(
        position => {
          const currentLocation = {
            latitude: parse(position.coords.latitude),
            longitude: parse(position.coords.longitude),
          };
          if (
            currentLocation.latitude !== realTimeLocationRef.current.latitude ||
            currentLocation.longitude !== realTimeLocationRef.current.longitude
          ) {
            console.log('setting Realtime');
            console.log(
              currentLocation.latitude +
                ' vs ' +
                realTimeLocationRef.current.latitude,
            );
            console.log(
              currentLocation.longitude +
                ' vs ' +
                realTimeLocationRef.current.longitude,
            );
            setRealTimeLocation(currentLocation);
          } else {
            console.log('same RealTime~~~~~~~~~~r');
          }
        },
        error => {
          console.error('Error getting location:', error);
        },
        {enableHighAccuracy: true, distanceFilter: 0},
      );
    };
    watchRealTime();
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    console.log('Updated realTimeLocation : ', realTimeLocation);
    if (!updatingLocation) {
      console.log('sending data');
      updateLocationMutation({
        variables: {
          lat: realTimeLocation.latitude,
          lon: realTimeLocation.longitude,
        },
      }).catch(error => console.log(error));
      if (
        Math.abs(realTimeLocation.latitude - lastSelectPoint.latitude) >
          rerenderThreshHold ||
        Math.abs(realTimeLocation.longitude - lastSelectPoint.longitude) >
          rerenderThreshHold
      ) {
        console.log('moved too much -> selecting near by again');
        refetch({
          lat: realTimeLocation.latitude,
          lon: realTimeLocation.longitude,
        }).catch(error => console.log('error : ', error));
      }
    } else {
      console.log('already sending');
    }
  }, [realTimeLocation]);

  useEffect(() => {
    if (initialLoading) {
      console.log('Fetching near by users');
    }
  }, [initialLoading]);

  useEffect(() => {
    console.log('Initiate');
    // 캐쉬 전부 삭제
    //
  }, [initialLatitude, initialLongitude]);

  return (
    <MapScreenLayout loading={initialLoading}>
      <MapView
        style={{flex: 1}}
        region={initialRegion}
        showsUserLocation={true}
        customMapStyle={customMapStyle}>
        {locationData &&
          meData?.id &&
          locationData.selectLocations &&
          locationData.selectLocations.locations &&
          locationData.selectLocations.locations.map(
            location =>
              location.lat &&
              location.lon &&
              meData.id != location.userId && (
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
