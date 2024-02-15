import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import RealTimeMap from '../components/map/RealTimeMap.tsx';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        if (
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          setLocationPermissionGranted(true);
          Geolocation.getCurrentPosition(
            position => {
              console.log('Getting data');
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            error => {
              console.error('Error getting location:', error);
            },
          );
        } else {
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.error('권한 오류:', err); // 구글 API 키 넣어야 함()
      }
    };
    requestLocationPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      {location && (
        <RealTimeMap
          latitude={location.latitude}
          longitude={location.longitude}
        />
      )}
    </View>
  );
}
