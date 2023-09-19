import {Pressable, View, Text} from 'react-native';
import tw from 'twrnc';
import React from 'react';

export const ContinueButton = ({
  handleSubmit,
  isValid,
  text,
}: {
  handleSubmit: () => void;
  isValid: boolean;
  text: string;
}) => {
  return (
    <View style={tw`flex justify-center pt-4`}>
      <Pressable
        onPress={handleSubmit}
        style={tw.style(
          `flex border rounded-lg w-[80%] h-12 self-center justify-center bg-zinc-400`,
          {
            'bg-black': isValid,
          },
        )}>
        <Text style={tw`flex mx-auto text-xl font-bold text-white`}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};
