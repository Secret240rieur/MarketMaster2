import {ScrollView, Text} from 'react-native';
import tw from 'twrnc';
import {Tstyle} from '../../Style';
import React from 'react';

export const Rejected = () => {
  return (
    <ScrollView style={tw`px-4 pt-10`}>
      <Text style={tw.style(Tstyle, `text-center`)}>
        Aucune annonce dans cette section. Cliquez sur vendre si vous souhaitez
        créer une annonce
      </Text>
    </ScrollView>
  );
};
