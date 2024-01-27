import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Assuming navigation is of a certain type, e.g., from react-navigation
// You should replace 'NavigationType' with the actual type based on your navigation library
type EmptyScreenProps = {
  navigation: NavigationType;
};

const EmptyScreen: React.FC<EmptyScreenProps> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
    await logUserOut();
    await GoogleSignin.signOut();
      await auth().signOut();

    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}>
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyScreen;