import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { ApiSignin } from "@/lib/appwrite/apicall";
import { useGlobalContext } from "@/lib/context/globalProvider";

function signin() {
  const { fetchAgain, isBeingLoad, isLoggedIn, user } = useGlobalContext();

  const handleSignin = async () => {
    const result = await ApiSignin();

    if (result) {
      // console.log(JSON.stringify(result, null, 2));
      fetchAgain();
    } else {
      Alert.alert("Error", "Failed to Login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Real Estate
          </Text>
          <Text className="text-3xl font-rubikBold text-black-300 text-center mt-2">
            Let's Get You Closer{"\n"}
            <Text className="text-primary-300">To Your Ideal Home</Text>
          </Text>
          <Text className="text-center text-lg mt-12 font-rubik text-black-200">
            Login to Real Estate with Google
          </Text>
          <TouchableOpacity
            onPress={handleSignin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubikMedium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default signin;
