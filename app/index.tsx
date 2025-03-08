import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const handleSigIn = () => {
    Alert.alert("Sign In");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity className="bg-blue-500 w-6/12 p-4 rounded-full" onPress={handleSigIn}>
        <Text className="text-white text-center">Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
