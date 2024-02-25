import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

interface screenLayoutProps {
  loading: boolean;
  children: React.ReactNode;
}

const EmptyView = styled.View`
  background-color: ${props => props.theme.bgColor};
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default function ScreenLayout({loading, children}: screenLayoutProps) {
  return (
    <EmptyView>
      {loading ? <ActivityIndicator color="white" /> : children}
    </EmptyView>
  );
}
