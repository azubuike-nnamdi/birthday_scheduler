import { SIGN_IN_URL } from "@/config/routes";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";


export default function AppLayout() {
  const { user, isLoading } = useAuth();

  //redirect to sign-in page if user is not authenticated
  if (!user) {
    return <Redirect href={SIGN_IN_URL} />;
  }

  //show indicator if user is loading
  if (isLoading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator size="large" className="" />
      </SafeAreaView>
    )
  }

  return <Slot />;
}