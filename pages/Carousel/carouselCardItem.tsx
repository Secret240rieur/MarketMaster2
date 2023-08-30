import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import tw from 'twrnc';
import React from 'react';

export const CarouselCardItem = ({item, index}: any) => {
  return (
    <View key={index} style={tw``}>
      <Image source={{uri: item}} style={tw`w-full h-[300px]`} />
    </View>
  );
};
