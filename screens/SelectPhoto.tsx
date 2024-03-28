// import styled from 'styled-components/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import React, {useCallback, useEffect, useState} from 'react';
// import {RootStackParamList} from '../shared/shared.types';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {FlatList, ScaledSize, useWindowDimensions} from 'react-native';
// import {useCameraRoll} from '@react-native-camera-roll/camera-roll';
// import {TouchableOpacity} from 'react-native-gesture-handler';
//
// type PhotoNavigationProps = NativeStackScreenProps<
//   RootStackParamList,
//   'StackPhotoNavigation'
// >;
//
// const Container = styled.View`
//   flex: 1;
//   background-color: ${props => props.theme.bgColor};
// `;
//
// const TopPhotoContainer = styled.View`
//   flex: 1;
//   background-color: ${props => props.theme.bgColor};
// `;
//
// const AssetPhotoImage = styled.Image<{width: number}>`
//   width: ${props => props.width}px;
//   height: 100%;
// `;
//
// const BottomPhotoContainer = styled.View`
//   flex: 1;
//   background-color: ${props => props.theme.bgColor};
// `;
//
// const FlatListContainer = styled(FlatList)`
//   width: 100%;
// `;
//
// const AssetPhotoItem = styled.Image<{width: number}>`
//   width: ${props => props.width / 4}px;
//   height: ${props => props.width / 4}px;
// `;
//
// const AssetPhotoItemIcon = styled(Icon)`
//   position: absolute;
//   bottom: 3px;
//   right: 3px;
// `;
//
// const HeaderRightContainer = styled.TouchableOpacity`
//   padding: 10px 12px;
// `;
//
// const HeaderRightText = styled.Text`
//   font-size: 17px;
//   color: ${props => props.theme.activeColor};
//   font-weight: bold;
// `;
//
// const SelectPhoto = ({navigation}: PhotoNavigationProps) => {
//   const {width}: ScaledSize = useWindowDimensions();
//   const [chosenPhotoUri, setChosenPhotoUri] = useState<string | undefined>('');
//   const [photos, setPhotos] = useState<string[]>([]);
//   const [pageSize, setPageSize] = useState(40); // 초기 랜더링되는 사진의 개수
//   const [photos2, getPhotos] = useCameraRoll();
//
//   useEffect(() => {
//     fetchPhotosFromAlbum();
//   }, []);
//
//   const fetchPhotosFromAlbum = async () => {
//     try {
//       const result = await getPhotos({first: pageSize});
//       if (result) {
//         const assets = photos2.edges.map((item: any) => item.node.image.uri);
//         setPhotos(assets);
//         if (assets.length > 0) {
//           setChosenPhotoUri(assets[0]);
//         }
//       } else {
//         console.error('Invalid result or result.edges:', result);
//       }
//     } catch (error) {
//       console.error('Error fetching photos:', error);
//     }
//   };
//
//   const handleNavigateToUploadPhotoScreen = (
//     chosenPhotoUri: string | undefined,
//   ): void => {
//     navigation.navigate('StackUploadPhotoNavigation', {
//       photoUri: chosenPhotoUri,
//     });
//   };
//
//   // FlatList Rendering Component
//   const _RenderItem = useCallback(({item}: any) => {
//     const uri = item.node.image.uri; // 각 항목에서 uri를 추출합니다.
//     console.log(uri);
//     return (
//       //<AssetPhotoItem width={width} source={{uri}} /> // uri를 source로 전달합니다.
//       <TouchableOpacity onPress={() => null}>
//         <AssetPhotoItem width={width} source={{uri}} />
//         {chosenPhotoUri && (
//           <AssetPhotoItemIcon name="checkbox" size={16} color="white" />
//         )}
//       </TouchableOpacity>
//     );
//   }, []);
//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => {
//         return (
//           <HeaderRightContainer
//             onPress={() => handleNavigateToUploadPhotoScreen(chosenPhotoUri)}>
//             <HeaderRightText>다음</HeaderRightText>
//           </HeaderRightContainer>
//         );
//       },
//     });
//   }, [chosenPhotoUri]);
//
//   return (
//     <Container>
//       <TopPhotoContainer>
//         {chosenPhotoUri !== '' && (
//           <AssetPhotoImage width={width} source={{uri: chosenPhotoUri}} />
//         )}
//       </TopPhotoContainer>
//       <BottomPhotoContainer>
//         <FlatListContainer
//           numColumns={4}
//           data={photos2.edges}
//           renderItem={_RenderItem}
//           keyExtractor={(item, index) => '#' + index.toString()}
//         />
//       </BottomPhotoContainer>
//     </Container>
//   );
// };
//
// export default SelectPhoto;
