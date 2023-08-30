import {Pressable, Text, View} from 'react-native';
import tw from 'twrnc';
import {Hstyle, PressableStyle, Tstyle, Vstyle} from '../Style';
import React from 'react';

type Props = {
  title: string;
  value: string;
  onPress: () => void;
  icon?: any;
};

export const Selectable = ({title, value, onPress, icon}: Props) => {
  return (
    <Pressable style={tw.style(PressableStyle)} onPress={onPress}>
      <View style={tw`flex flex-col gap-y-5 `}>
        <View style={tw.style(Vstyle)}>
          {icon}
          <Text style={tw.style(Hstyle)}>{title}</Text>
        </View>
        <Text style={tw.style(Tstyle, `ml-10`)}>{value}</Text>
      </View>
      {/* <AntDesign
        name="right"
        size={20}
        color="#3f3f46"
        style={tw`self-center `}
      /> */}
    </Pressable>
  );
};