import { DASHBOARD_URL, HOME_URL } from "@/config/routes";
import icons from "@/constant/icons";
import images from "@/constant/images";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SignIn() {
  const { user, signIn } = useAuth();

  if (user) {
    return <Redirect href={HOME_URL} />;
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={images.LadyWithCake2}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black opacity-50" />

        <SafeAreaView className="flex-1 justify-between">
          <View className="flex-1" />

          <View className="px-6 pb-16">
            <View className="space-y-4 mb-10">
              <Text className="text-3xl font-bold text-center text-white">
                Welcome to Birthday Scheduler
              </Text>
              <Text className="text-lg text-center text-white">
                Let's Get You Closer to{'\n'}
                Your Special Days
              </Text>
            </View>

            <TouchableOpacity
              className="bg-white rounded-full py-4 flex-row justify-center items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
                elevation: 4,
              }}
              onPress={signIn}
            >
              <Image
                source={icons.google}
                className="w-6 h-6"
                resizeMode="contain"
              />
              <Text className="text-base font-medium text-gray-800 ml-4">
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

export default SignIn;