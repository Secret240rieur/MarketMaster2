import {Pressable, Text, View} from 'react-native';
import {BodyStyle, PressableStyle, TitleStyle} from '../Style';
import tw from 'twrnc';
import React from 'react';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import {GlobalScreenContainer} from '../GlobalScreenContainer';

type Props = {
  title: string;
  list: string[];
  onPress: (value: string) => void;
  txtColor: string;
  icnColor: string;
};

export const List = ({title, list, onPress, txtColor, icnColor}: Props) => {
  return (
    <GlobalScreenContainer>
      <View style={tw.style(BodyStyle, `px-4`)}>
        <Text style={tw.style(TitleStyle, txtColor)}>{title}</Text>
        {list.map((value, i) => (
          <Pressable
            key={i}
            onPress={() => onPress(value)}
            style={tw.style(PressableStyle)}>
            <Text style={tw.style('text-lg mb-4', txtColor)}>{value}</Text>
            <ChevronRightIcon
              size={20}
              color={icnColor}
              style={tw`self-center `}
            />
          </Pressable>
        ))}
      </View>
    </GlobalScreenContainer>
  );
};
