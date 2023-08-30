import {ScrollView, Text, View} from 'react-native';
import tw from 'twrnc';
import {Tstyle} from '../../Style';
import {AdView} from '../../Annonce/AdView';
import React from 'react';

export const AccountAds = ({adState}: {adState: Ad[] | undefined}) => {
  return (
    <ScrollView style={tw`px-2 pt-10`}>
      {adState && adState.length > 0 && (
        <View style={tw.style('flex flex-row flex-wrap gap-3 mb-20')}>
          {adState.map((value, i) => (
            <AdView
              key={i}
              id={value.id}
              image={value.imagesUrl[0]}
              title={value.title}
              price={value.price}
            />
          ))}
        </View>
      )}
      {adState && adState.length <= 0 && (
        <Text style={tw.style(Tstyle, `text-center`)}>
          Aucune annonce dans cette section. Cliquez sur vendre si vous
          souhaitez créer une annonce
        </Text>
      )}
    </ScrollView>
  );
};
