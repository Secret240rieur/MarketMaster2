import {View, Pressable} from 'react-native';
import tw from 'twrnc';
import {Linking, Share} from 'react-native';
import React from 'react';
import {ShareIcon} from 'react-native-heroicons/outline';

export const Contact = ({ad}: {ad: Ad}) => {
  let URL = 'whatsapp://send?text=' + 'hi';

  const onShare = async () => {
    await Share.share({url: URL});
  };

  return (
    <View style={tw`flex flex-row justify-between h-12 gap-1`}>
      <Pressable
        onPress={onShare}
        style={tw`bg-white rounded-full px-[12px] justify-center`}>
        <ShareIcon size={25} color="black" />
      </Pressable>
    </View>
  );
};
