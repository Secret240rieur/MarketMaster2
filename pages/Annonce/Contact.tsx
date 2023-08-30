import {View, Pressable} from 'react-native';
import tw from 'twrnc';
import {Linking} from 'react-native';
import React from 'react';

export const Contact = ({ad}: {ad: Ad}) => {
  let URL = 'whatsapp://send?text=' + 'hi';
  return (
    <View style={tw`flex flex-row justify-between h-12 gap-1`}>
      <Pressable
        onPress={() => Linking.openURL(URL)}
        style={tw`bg-white rounded-full px-[12px] justify-center`}>
        {/* <Ionicons name="ios-logo-whatsapp" size={25} color="#25D366" /> */}
      </Pressable>
      <Pressable
        onPress={() => Linking.openURL(`tel:${ad.phone}`)}
        style={tw`bg-white rounded-full px-[15px] justify-center`}>
        {/* <FontAwesome name="phone" size={25} color="#2563eb" /> */}
      </Pressable>
    </View>
  );
};
