import {useNavigation} from '@react-navigation/native';
import {Pressable, Image, Text, View} from 'react-native';
import tw from 'twrnc';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';
import {BrdColor, IcnColor, TxtColor} from '../Style';

type Props = {
  fullWidth?: boolean;
  image: any;
  title: string;
  price: number;
  id: string;
};

export const AdView = ({fullWidth = false, image, title, price, id}: Props) => {
  const navigation = useNavigation<any>();
  const isDarkMode = useSelector((state: RootState) => state.info.isDarkMode);
  const txtColor = TxtColor(isDarkMode);
  const icnColor = IcnColor(isDarkMode);
  const brdColor = BrdColor(isDarkMode);
  return (
    <Pressable
      style={tw.style('flex flex-col w-[48%] rounded  ', {
        'w-full': fullWidth,
      })}
      onPress={() =>
        navigation.navigate({
          name: 'AdPage',
          params: {
            id,
            txtColor,
            icnColor,
          },
        })
      }>
      <Image
        source={{uri: image}}
        style={tw.style('w-full h-48 rounded-t-2xl')}
      />

      <View style={tw.style('flex p-4 rounded-b-2xl border', brdColor)}>
        <Text style={tw.style('text-xl font-bold ', txtColor)}>{price} DH</Text>
        <Text numberOfLines={1} style={tw.style('text-base text-gray-400 ')}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
