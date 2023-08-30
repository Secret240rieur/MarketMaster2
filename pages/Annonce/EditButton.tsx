import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import React from 'react';
import {PencilSquareIcon} from 'react-native-heroicons/outline';

export const EditButton = ({ad}: {ad: Ad}) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate({
          name: 'EditAd',
          params: {
            ad,
          },
        })
      }>
      <PencilSquareIcon size={31} color="black" />
    </Pressable>
  );
};
