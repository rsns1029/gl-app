import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

const InstagramLoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [code, setCode] = useState(null);

  const clientId = '5b5430f80f04252344a4c1c21350dbae';
  const redirectUri = 'https://2465-39-124-82-67.ngrok-free.app';
  const responseType = 'code';
  const instagramAuthURL = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=${responseType}`;

  const handleWebViewNavigationStateChange = (event) => {
    if (event.url.startsWith(redirectUri)) {
      const urlCode = event.url.split('=')[1].split('#')[0];
     // setCode(urlCode);
      setModalVisible(false);
      console.error('Insta 로그인 setCode:', urlCode);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Icon name="instagram" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}> Login Instagram</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <WebView
          source={{uri: instagramAuthURL}}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          style={{marginTop: 20}}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#E1306C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  icon: {},
});

export default InstagramLoginScreen;
