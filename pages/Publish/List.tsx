import {Pressable, Text, ScrollView} from 'react-native';
import {BodyStyle, PressableStyle, TitleStyle} from '../Style';
import tw from 'twrnc';
import React from 'react';

type Props = {
  title: string;
  list: string[];
  onPress: (value: string) => void;
};

export const List = ({title, list, onPress}: Props) => {
  return (
    <ScrollView style={tw.style(BodyStyle, `px-4`)}>
      <Text style={tw.style(TitleStyle)}>{title}</Text>
      {list.map((value, i) => (
        <Pressable
          key={i}
          onPress={() => onPress(value)}
          style={tw.style(PressableStyle)}>
          <Text style={tw.style('text-lg  text-white mb-4')}>{value}</Text>
          {/* <AntDesign
            name="right"
            size={20}
            color="#3f3f46"
            style={tw`self-center `}
          /> */}
        </Pressable>
      ))}
    </ScrollView>
  );
};
