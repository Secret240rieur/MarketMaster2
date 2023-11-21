import {useNavigation} from '@react-navigation/native';
import {Pressable, Text, View} from 'react-native';
import tw from 'twrnc';
import React from 'react';
import {ChatBubbleLeftEllipsisIcon} from 'react-native-heroicons/outline';

export const ChatButton = ({ad, txtColor}: {ad: Ad; txtColor: string}) => {
  const navigator = useNavigation<any>();
  return (
    <Pressable
      style={tw`bg-blue-600 w-22 h-12 rounded-3xl py-2 px-3 flex flex-row justify-between`}
      onPress={() =>
        navigator.navigate({
          name: 'ChatPage',
          params: {
            aid: ad.id,
            image: ad.imagesUrl[0],
            title: ad.title,
            adUid: ad.uid,
            price: ad.price,
            txtColor,
          },
        })
      }>
      <View style={tw`self-center`}>
        <ChatBubbleLeftEllipsisIcon size={22} color="white" />
      </View>
      <Text style={tw`text-sm text-white self-center font-bold`}>Chat</Text>
    </Pressable>
  );
};
