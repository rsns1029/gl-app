import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef, FC } from "react";
import { Button } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { logUserIn } from "../apollo";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface LoginProps {
  route: {
    params: {
      username?: string;
      password?: string;
    };
  };
}

const Login: FC<LoginProps> = ({ route: { params } }) => {
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId: '200851602419-5ebei1h581bd4d93ccpehak6pkuiobk3.apps.googleusercontent.com',
    });
  };

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const userInfo = await GoogleSignin.signIn();
      console.log("구글 토큰: ", idToken);

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      setValue('username', userInfo.user.email);
      setValue('password', userInfo.user.id);
      handleSubmit(onValid)
    } catch (error) {
      console.error("Google 로그인 실패:", error);
    }
  }

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });

  const onCompleted = async (data: any) => {
    const {
      login: { ok, token, error },
    } = data;
    console.log("ok : ", ok);
    console.log("token : ", token);
    console.log("error : ", error);
    if (ok) {
      await logUserIn(token);
    }
  };

  const onValid = (data: any) => {
    setErrorMsg('');
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const [logInMutation, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const passwordRef = useRef<any>();
  const onNext = (nextOne: React.RefObject<TextInput>) => {
    nextOne.current?.focus();
  };

  useEffect(() => {
    googleSigninConfigure();
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout logoMarginTop={150}>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      />

      {/* <Button
        title="Sign in with google"
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      /> */}
      <GoogleSigninButton
        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      />
      {/* <GoogleSigninButton onPress={() => onGoogleButtonPress()} /> */}
    </AuthLayout>
  );
};

export default Login;