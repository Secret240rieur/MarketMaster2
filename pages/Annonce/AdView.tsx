import {useNavigation} from '@react-navigation/native';
import {Pressable, Image, Text, View} from 'react-native';
import tw from 'twrnc';
import React from 'react';

type Props = {
  fullWidth?: boolean;
  image: any;
  title: string;
  price: number;
  id: string;
};

export const AdView = ({fullWidth = false, image, title, price, id}: Props) => {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      style={tw.style('flex flex-col w-[48%] rounded  ', {
        'w-full': fullWidth,
      })}
      onPress={() => navigation.navigate({name: 'AdPage', params: {id: id}})}>
      <Image
        source={{uri: image}}
        style={tw.style('w-full h-48 rounded-t-2xl')}
      />

      <View style={tw.style('flex p-4 bg-zinc-700 rounded-b-2xl')}>
        <Text style={tw.style('text-xl font-bold text-white ')}>
          {price} DH
        </Text>
        <Text numberOfLines={1} style={tw.style('text-base text-gray-400 ')}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
