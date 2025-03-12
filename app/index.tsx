import { Text, View } from "react-native";
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useGoogleSignIn } from '../config/signin';
import { configureGoogleSignIn } from '../config/google-config';
import SignIn from "./sign-in";

configureGoogleSignIn();

function Home() {
  const { signIn } = useGoogleSignIn();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to Birthday Scheduler</Text>
      <SignIn />
    </View>
  );
}

export default Home;
