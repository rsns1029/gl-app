import React, {useEffect, useState} from 'react';
import {User} from '../../shared/shared.types.ts';
import MapView, {Marker, Region} from 'react-native-maps';
import {customMapStyle} from '../../styles/mapStyle.ts';
import {useSubscription} from '@apollo/client';
import {MAP_UPDATES} from '../../documents/subscriptions/mapUpdates.subscription.ts';

interface RealTimeMapProps {
  latitude: number;
  longitude: number;
}

export default function RealTimeMap({latitude, longitude}: RealTimeMapProps) {
  console.log('lat lon : ', latitude, longitude);
  const {data, loading, error} = useSubscription(MAP_UPDATES, {
    variables: {
      generalLat: latitude,
      generalLon: longitude,
    },
  });

  console.log(data);

  const initialRegion: Region = {
    latitude: latitude ? latitude : 0,
    longitude: longitude ? longitude : 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
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
    </MapView>
  );
}
