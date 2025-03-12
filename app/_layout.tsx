import { Stack } from "expo-router";
import "./global.css"
import "../config/google-config";
import { AuthProvider } from "@/context/AuthContext";


export default function RootLayout() {


  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
}
