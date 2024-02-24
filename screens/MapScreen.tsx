import React, {useEffect, useState} from 'react';
import {View, Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RealTimeMap from '../components/map/RealTimeMap.tsx';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [initialLocation, setInitialLocation] = useState<LocationCoords | null>(
    null,
  );
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let granted;
        if (Platform.OS === 'ios') {
          granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
          granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ]);
        }
        // if (
        //   granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        //     PermissionsAndroid.RESULTS.GRANTED &&
        //   granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        //     PermissionsAndroid.RESULTS.GRANTED
        // ) {
        setLocationPermissionGranted(true);
        Geolocation.getCurrentPosition(
          position => {
            console.log('Getting data');
            setInitialLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            console.error('Error getting location:', error);
          },
        );
        // } else {
        //   console.warn('Location permission denied');
        // }
      } catch (err) {
        console.error('권한 오류:', err); // 구글 API 키 넣어야 함()
      }
    };
    requestLocationPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      {initialLocation && (
        <RealTimeMap
          initialLatitude={initialLocation.latitude}
          initialLongitude={initialLocation.longitude}
        />
      )}
    </View>
  );
}
