import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  StyleSheet,
  DrawerLayoutAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RealTimeMap from '../components/map/RealTimeMap.tsx';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import SideBar from '../components/map/SideBar.tsx';
import {styles as SideBarStyles} from '../components/map/SideBar.tsx';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface PhotoData {
  id: number;
  url: string;
}

export default function MapScreen() {
  const [initialLocation, setInitialLocation] = useState<LocationCoords | null>(
    null,
  );
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); //  사이드바
  const [photos, setPhotos] = useState<PhotoData[]>([]); // 추가 데이터
  const [isLoading, setIsLoading] = useState<boolean>(false); // 추가 데이터 로딩 상태
  const [page, setPage] = useState<number>(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState<number>(5); // 전체 페이지 수

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
    fetchPhotos(); // 초기 데이터 가져오기
  }, []);

  // 추가 데이터 가져오기 함수
  const fetchPhotos = () => {
    if (page <= totalPages) {
      setIsLoading(true);
      // Simulating fetch data delay
      setTimeout(() => {
        const newPhotos = Array.from({length: 10}, (_, index) => ({
          id: (page - 1) * 10 + index + 1,
          url: `https://via.placeholder.com/300/${Math.floor(
            Math.random() * 16777215,
          ).toString(16)}/FFFFFF?text=Photo ${page * 10 + index + 1}`,
        }));
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        setIsLoading(false);
        setPage(prevPage => prevPage + 1);
      }, 1000);
    }
  };

  // 스크롤 끝에 도달했을 때 추가 데이터 로드
  const handleEndReached = () => {
    if (!isLoading) {
      fetchPhotos();
    }
  };

  const drawerRef = useRef<DrawerLayoutAndroid>(null);
  // 사이드바 작업
  const openSidebar = () => {
    drawerRef.current?.openDrawer();
  };

  // 사이드바 닫기
  const closeSidebar = () => {
    drawerRef.current?.closeDrawer();
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition={'right'}
      renderNavigationView={() => (
        <SideBar
          photos={photos}
          isLoading={isLoading}
          onClose={closeSidebar}
          onEndReached={handleEndReached}
        />
      )}>
      <View style={{flex: 1}}>
        {initialLocation && (
          <RealTimeMap
            initialLatitude={initialLocation.latitude}
            initialLongitude={initialLocation.longitude}
          />
        )}
        <TouchableOpacity
          onPress={openSidebar}
          style={SideBarStyles.sidebarButton}>
          <Text style={SideBarStyles.sidebarButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>
    </DrawerLayoutAndroid>
  );
}
