import {View, Text, TextInput, KeyboardTypeOptions} from 'react-native';
import {Hstyle} from '../Style';
import tw from 'twrnc';
import React from 'react';

type Props = {
  title: string;
  value: string;
  icon?: any;
  icon2?: any;
  placeholder?: string;
  onChangeText?: any;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: any;
  autoFocus?: boolean;
};

export const ProfilInput = ({
  value,
  title,
  icon,
  autoFocus = false,
  placeholder,
  onChangeText,
  editable = true,
  icon2,
  keyboardType,
  errorMessage,
}: Props) => {
  return (
    <View style={tw`gap-2`}>
      <Text style={tw.style(Hstyle)}>{title}</Text>
      <View
        style={tw.style(
          `flex flex-row items-center border border-slate-300 rounded p-2 gap-2`,
          {'bg-slate-300': !editable},
        )}>
        {icon}
        <TextInput
          autoFocus={autoFocus}
          style={tw.style(`text-lg text-black pb-2 w-full`, {
            'text-gray-400': !editable,
          })}
          placeholder={placeholder}
          placeholderTextColor={'#3f3f46'}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          keyboardType={keyboardType}></TextInput>
        <View style={tw`absolute  right-2`}>{icon2}</View>
      </View>
      <Text>{errorMessage}</Text>
    </View>
  );
};
