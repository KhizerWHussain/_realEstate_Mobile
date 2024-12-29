import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/context/globalProvider";
import icons from "@/constants/icons";
import SearchBar from "@/components/search";

function Base() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="size-12 rounded-full"
            />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">
                Good Morning
              </Text>
              <Text className="text-base font-rubikMedium text-black-300">
                {user?.name}
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
}

export default Base;
