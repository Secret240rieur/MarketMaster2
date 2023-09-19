import tw from 'twrnc';
import {View, Image, Text, Pressable} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

export const ConversationPreview = ({
  id,
  adUid,
  image,
  title,
  price,
  message,
  date,
  aid,
}: {
  id: string;
  adUid: string;
  image: string;
  // date: firestore.Timestamp;
  date: any;
  price: number;
  title: string;
  message: string;
  aid: string;
}) => {
  const navigator = useNavigation<any>();

  return (
    <Pressable
      style={tw`flex flex-row px-3 py-2 rounded-5 justify-between gap-3 mt-3`}
      onPress={() =>
        navigator.navigate({
          name: 'ChatPage',
          params: {
            id,
            image,
            title,
            adUid,
            price,
            aid,
          },
        })
      }>
      <Image
        source={{uri: image}}
        style={tw`w-20 h-20 rounded-5 self-center`}
      />
      <View style={tw`flex-1 gap-0`}>
        <Text numberOfLines={1} style={tw`text-black font-bold text-xl`}>
          {title.toUpperCase()}
        </Text>
        <Text style={tw`text-black text-lg`}>{price} DH</Text>
        <View style={tw` flex flex-row justify-between`}>
          <Text numberOfLines={1} style={tw`text-gray-400 text-sm`}>
            {message}
          </Text>
          <Text style={tw`text-black text-lg`}>
            {moment(date.toDate()).format('LT')}
          </Text>
        </View>
      </View>
      <ChevronRightIcon size={20} color="#3f3f46" style={tw`self-center `} />
    </Pressable>
  );
};
