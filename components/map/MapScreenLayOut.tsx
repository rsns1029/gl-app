import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

interface mapScreenLayoutProps {
  loading: boolean;
  children: any;
}

const MapViewLayout = styled.View`
  flex: 1;
  justify-content: center;
  /* align-items: center;  <----- for some reason, this deletes the map; */
  color: ${props => props.theme.fontColor};
`;

export default function MapScreenLayout({
  loading,
  children,
}: mapScreenLayoutProps) {
  return (
    <MapViewLayout>{loading ? <ActivityIndicator /> : children}</MapViewLayout>
  );
}
