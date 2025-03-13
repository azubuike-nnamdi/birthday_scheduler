import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Redirect } from 'expo-router';
import { router } from 'expo-router';
import { signIn } from '@/config/signin';
import { SIGN_IN_URL } from '@/config/routes';
import images from '@/constant/images';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: "Never Forget a Birthday",
    description: "Keep track of all your friends and family birthdays in one place.",
    image: images.SmilingLady,
    bgColor: "white", // white
  },
  {
    id: 2,
    title: "Find Your Perfect Gift",
    description: "Confused about what gift to get? Don't worry! Find the best gift suggestions here",
    image: images.LadyShopping,
    bgColor: "white", // white
  },
  {
    id: 3,
    title: "Your Birthday, Your Way",
    description: "Create memorable birthday celebrations for your loved ones",
    image: images.LadyHavingCoffee,
    bgColor: "white"
  },
];

const WelcomeScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      Animated.timing(slideAnimation, {
        toValue: -(currentSlideIndex + 1) * width,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToLogin = () => {
    router.push(SIGN_IN_URL);
  };

  const Slide = ({ item }: { item: any }) => {
    return (
      <View className={`w-screen h-screen ${item.bgColor}`}>
        {/* Vertical text on the side */}
        <Text className="absolute left-6 top-20 text-white text-6xl font-bold -rotate-90 origin-top-left opacity-50">
          {item.title.split(' ')[0]}
        </Text>

        {/* Main Image */}
        <Image
          source={item.image}
          className="w-full h-[75%] object-cover"
          resizeMode="cover"
        />

        {/* Bottom Content Container */}
        <View className="absolute bottom-32 left-0 right-0">
          <View className="bg-white rounded-t-[30px] px-6 pt-8 pb-4 items-center">
            <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">
              {item.title}
            </Text>
            <Text className="text-md text-gray-600 text-center">
              {item.description}
            </Text>
            <View className="flex-row mt-4 justify-center">
              {slides.map((_, index) => (
                <View
                  key={index}
                  className={`h-1.5 rounded-full mx-0.5 ${currentSlideIndex === index ? 'w-6 bg-[#2F4858]' : 'w-1.5 bg-gray-300'
                    }`}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white relative">
      <Animated.View
        className="flex-row absolute left-0 right-0 top-0 bottom-0"
        style={{
          width: width * slides.length,
          transform: [{ translateX: slideAnimation }],
        }}
      >
        {slides.map((item) => (
          <Slide key={item.id} item={item} />
        ))}
      </Animated.View>

      {/* Button Container */}
      <View className="absolute bottom-12 w-full px-5 items-center z-20 ">
        {currentSlideIndex < slides.length - 1 ? (
          <>
            <TouchableOpacity
              className="bg-gray-200 w-[40%] py-3 rounded-full items-center"
              onPress={goToNextSlide}
            >
              <Text className="text-gray-800 font-medium">
                Next
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4"
              onPress={goToLogin}
            >
              <Text className="text-gray-500 text-sm">
                Skip
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              className="bg-[#2F4858] w-[40%] py-3 rounded-full items-center"
              onPress={goToLogin}
            >
              <Text className="text-white font-medium">
                Let's get started
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4"
              onPress={goToLogin}
            >
              <Text className="text-gray-500 text-sm">
                Skip
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default WelcomeScreen;