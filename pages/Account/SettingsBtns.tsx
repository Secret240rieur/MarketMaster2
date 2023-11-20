import {View, Text, Pressable} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';

type Props = {
  navigateTo: string;
  icon?: any;
  title: string;
  onPress?: () => void;
  txtColor: string;
  icnColor: string;
};

export const SettingsBtns = ({
  navigateTo,
  icon,
  title,
  onPress,
  icnColor,
  txtColor,
}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      style={tw`flex flex-row justify-between rounded-lg px-2 py-1`}
      onPress={() => {
        if (onPress) onPress();
        navigation.navigate(navigateTo);
      }}>
      <View style={tw`flex flex-row gap-2`}>
        {icon}
        <Text style={tw.style(`text-lg self-center`, txtColor)}>{title}</Text>
      </View>
      <ChevronRightIcon size={20} color={icnColor} style={tw`self-center `} />
    </Pressable>
  );
};
