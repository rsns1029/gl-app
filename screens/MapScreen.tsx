import React, { useEffect, useState, SetStateAction, Dispatch } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid } from 'react-native';


interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface PhotoData {
  id: number;
  url: string;
}

export default function MapScreen() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); //  사이드바
  const [photos, setPhotos] = useState<PhotoData[]>([]); // 추가 데이터
  const [isLoading, setIsLoading] = useState<boolean>(false); // 추가 데이터 로딩 상태
  const [page, setPage] = useState<number>(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState<number>(5); // 전체 페이지 수

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
          Geolocation.getCurrentPosition(
            position => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            error => {
              console.error('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } else {
          console.warn('Location permission denied');
        }
      } catch (err) {
        console.error('권한 오류:', err); // 구글 API 추가 완료 => 이후에 API 키 숨기는 작업 필요
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
        const newPhotos = Array.from({ length: 10 }, (_, index) => ({
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

  // 사이드바 작업
  const openSidebar = () => {
    setIsSidebarOpen(true);
    fetchPhotos(); // 사이드바 열릴 때 데이터 가져오도록 호출
  };

  // 사이드바 닫기
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const initialRegion: Region = {
    latitude: location ? location.latitude : 0,
    longitude: location ? location.longitude : 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const customMapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    // 도로 색상이 이상함
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#FFFFFF', // 도로 스타일 변경
        },
      ],
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={initialRegion}
        showsUserLocation={true}
        customMapStyle={customMapStyle} // 임의로 스타일 적용
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
          />
        )}
      </MapView>
      {isSidebarOpen && (
        <View style={styles.sidebar}>
          {/* 사이드바 컨텐츠 */}
          <FlatList
            data={photos}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.sidebarItem}>
                <Image
                  source={{ uri: item.url }}
                  style={{ width: 100, height: 100 }}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
          />
          <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
        </View>
      )}
      {!isSidebarOpen && (
        <TouchableOpacity onPress={openSidebar} style={styles.sidebarButton}>
          <Text style={styles.sidebarButtonText}>{'<'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 200,
    backgroundColor: 'white',
    padding: 20,
    zIndex: 1000, // 사이드바가 지도 위에 올 수 있도록 설정
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  sidebarButton: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: [{ translateY: -25 }],
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  sidebarButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  sidebarItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
