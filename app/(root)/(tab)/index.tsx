
import { useAuth } from '@/context/AuthContext';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {

  const { user, signOut } = useAuth();

  return (
    <SafeAreaView className='flex-1 justify-center items-center'>
      <Text className="text-xl font-bold mb-4">Welcome, {user?.user?.name}</Text>
      <Text className="mb-4">Email: {user?.user?.email}</Text>

      <TouchableOpacity
        onPress={signOut}
        className="bg-red-500 p-2 rounded-md"
      >
        <Text className="text-white text-center">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
} 