import {Pressable, View, Text} from 'react-native';
import tw from 'twrnc';
import {Hstyle, Vstyle} from '../Style';
import React from 'react';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

type Props = {
  title: string;
  value: string;
  onPress: () => void;
  icon?: any;
};

export const Selectable = ({title, value, onPress, icon}: Props) => {
  return (
    <View
      style={tw`flex flex-row justify-between mx-3 pb-3 border-b-2 border-[#3f3f46]`}>
      <View style={tw.style(Vstyle)}>
        <View style={tw` pt-1`}>{icon}</View>
        <Text style={tw`text-lg  text-black`}>{title}</Text>
      </View>
      <Pressable
        style={tw`flex flex-row justify-between items-center gap-7`}
        onPress={onPress}>
        <Text style={tw`text-lg  text-black`}>{value}</Text>
        <ChevronRightIcon size={20} color="#3f3f46" style={tw`self-center`} />
      </Pressable>
    </View>
  );
};
