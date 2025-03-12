import { View, Text, Button, TouchableOpacity } from "react-native";
import { useGoogleSignIn } from "@/config/signin";

function SignIn() {
  const { userInfo, signIn } = useGoogleSignIn();

  return (
    <View>
      <TouchableOpacity onPress={signIn} className="bg-blue-500 p-2 rounded-md text-white">
        <Text className="text-center text-white">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignIn;