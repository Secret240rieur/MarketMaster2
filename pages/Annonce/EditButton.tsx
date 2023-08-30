import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import React from 'react';

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
      {/* <FontAwesome name="pencil-square-o" size={31} color="black" /> */}
    </Pressable>
  );
};
