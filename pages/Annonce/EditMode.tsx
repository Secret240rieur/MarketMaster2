import {View} from 'react-native';
import tw from 'twrnc';
import {EditButton} from './EditButton';
import {DeleteButton} from './DeleteButton';
import React from 'react';

export const EditMode = ({ad}: {ad: Ad}) => {
  return (
    <View
      style={tw`flex flex-row bg-white w-22 h-12 py-2 px-3 rounded-3xl gap-1`}>
      <EditButton ad={ad} />
      <DeleteButton id={ad.id} />
    </View>
  );
};
