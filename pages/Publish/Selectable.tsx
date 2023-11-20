import {Pressable, Text, View} from 'react-native';
import tw from 'twrnc';
import {Hstyle, PressableStyle, Tstyle, Vstyle} from '../Style';
import React from 'react';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

type Props = {
  title: string;
  value: string;
  onPress: () => void;
  icon?: any;
  icnColor: string;
  txtColor: string;
};

export const Selectable = ({
  title,
  value,
  onPress,
  icon,
  icnColor,
  txtColor,
}: Props) => {
  return (
    <Pressable style={tw.style(PressableStyle)} onPress={onPress}>
      <View style={tw`flex flex-col gap-y-5 `}>
        <View style={tw.style(Vstyle)}>
          {icon}
          <Text style={tw.style(Hstyle, txtColor)}>{title}</Text>
        </View>
        <Text style={tw.style(Tstyle, txtColor, `ml-10`)}>{value}</Text>
      </View>
      {<ChevronRightIcon size={20} color={icnColor} style={tw`self-center `} />}
    </Pressable>
  );
};
