import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

function Base() {
  return (
    <View className="text-center h-screen w-screen justify-center items-center flex">
      <Text className="font-bold text-xl mb-10 font-rubik">
        Welcome to Real Estate
      </Text>
      <Link href={"/signin"}>Sign in</Link>
      <Link href={"/explore"}>Explore</Link>
      <Link href={"/profile"}>Profile</Link>
      <Link href={"/properties/1"}>First Property</Link>
    </View>
  );
}

export default Base;
