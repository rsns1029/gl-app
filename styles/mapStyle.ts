export const customMapStyle = [
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
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {visibility: 'off'}, // 상호명 숨김
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {visibility: 'off'}, // 도로 아이콘 숨김
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [
      {visibility: 'off'}, // 대중교통 숨김
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [
      {visibility: 'off'}, // 지형지물 상호명 숨김
    ],
  },
  // 도로명 숨김
  {
    featureType: 'road',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
