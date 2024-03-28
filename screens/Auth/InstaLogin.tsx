import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

const InstagramLoginScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [code, setCode] = useState(null);

  const clientId = 'YOUR_CLIENT_ID';
  const redirectUri = 'YOUR_REDIRECT_URI';
  const responseType = 'code';
  const instagramAuthURL = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=${responseType}`;

  const handleWebViewNavigationStateChange = (event: {url: string}) => {
    if (event.url.startsWith(redirectUri)) {
      const code = event.url.split('=')[1].split('#')[0];
      //setCode(code);
      setModalVisible(false);
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
