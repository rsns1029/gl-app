import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import ProfileBody from '../components/profile/ProfileBody';
import ProfileButton from '../components/profile/ProfileButton';
import useMe from '../hooks/useMe';

const Container = styled(SafeAreaView)`
  flex: 1;
`;

const ContentContainer = styled(View)`
  width: 100%;
  padding: 10px;
`;

const HorizontalScrollView = styled(ScrollView)`
  padding-vertical: 5px;
  padding-horizontal: 10px;
`;

const Profile = () => {
  const LoadingComponent: React.FC = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const {data} = useMe();
  console.log('data : ', data);
  // data가 존재하고, me 속성도 존재하는지 확인
  if (!data || !data.me) {
    // 에러 처리 또는 로딩 상태 처리
    return <LoadingComponent />;
  }

  console.log('data: ', data);

  return (
    <Container>
      <ContentContainer>
        <ProfileBody
          name={data.me.username}
          accountName={data.me.username}
          profileImage={require('../assets/glLogo.png')}
          followers="300"
          following="35"
          post="458"
          style={{
            imageStyle: {
              width: 135,
              height: 80,
              borderRadius: 100,
            },
            nameStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: 'white',
            },
          }}
        />
        <ProfileButton
          id={0}
          name="Johnny"
          accountName="johnny"
          profileImage={require('../assets/glLogo.png')}
        />
      </ContentContainer>

      <HorizontalScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default Profile;
