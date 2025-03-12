import { DASHBOARD_URL, HOME_URL } from "@/config/routes";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

function SignIn() {
  const { user, signIn } = useAuth();

  if (user) {
    return <Redirect href={HOME_URL} />;
  }

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-8">Welcome</Text>
      <TouchableOpacity
        onPress={signIn}
        className="bg-blue-500 p-4 rounded-md w-full"
      >
        <Text className="text-center text-white font-semibold">Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignIn;