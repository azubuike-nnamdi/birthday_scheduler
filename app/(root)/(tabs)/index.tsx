import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import icons from '@/constants/icons';
import { SafeAreaView } from "react-native-safe-area-context";



export default function Index() {
  const handleSignIn = () => {
    //TODO: Implement sign in
  };
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <View>
          <Text className='text-base text-center uppercase font-rubik text-black-200'>Welcome to back!</Text>
          <Text className='text-3xl font-rubikBold text-center text-black-300 mt-2'>
            <Text className='text-primary-300 font-bold'> Birthday Scheduler</Text>
          </Text>
          <Text className='text-base text-center font-rubik text-black-200 mt-12'>Sign in to your account with Google</Text>
          <TouchableOpacity className='bg-white shadow-md shadow-zinc-300 w-full py-4 rounded-full p-2 mt-5'
            onPress={handleSignIn}>
            <View className='flex flex-row items-center justify-center'>
              <Image source={icons.google} className='w-6 h-6' resizeMode='contain' />
              <Text className='text-base font-semibold text-black-300 ml-4'>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
