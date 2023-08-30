import BottomSheet from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import tw from 'twrnc';
import {Selectable} from '../Publish/Selectable';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store';
import {useNavigation} from '@react-navigation/native';
import {resetFilter} from '../InfoSlice';
import React from 'react';

export const FilterBottomSheet = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const category = useSelector((state: RootState) => state.info.categoryFilter);
  const city = useSelector((state: RootState) => state.info.cityFilter);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['94%', '94%'], []);
  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.expand();
    }
  }, [open, bottomSheetRef.current]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) onClose();
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      backgroundStyle={{backgroundColor: '#27272a'}}
      handleIndicatorStyle={{backgroundColor: '#27272a'}}>
      <View style={tw`bg-zinc-800 flex-1 px-5`}>
        <View style={tw`h-10 relative mb-5`}>
          <Text style={tw`absolute self-center text-2xl font-bold text-white`}>
            Filter
          </Text>
          <Pressable
            style={tw` self-end`}
            onPress={() => dispatch(resetFilter())}>
            <Text style={tw`text-lg text-[#2563eb]`}>Reset</Text>
          </Pressable>
        </View>
        <Selectable
          title={'Catégories'}
          value={category}
          onPress={() =>
            navigation.navigate({
              name: 'Categories',
              params: {
                isFilter: true,
              },
            })
          }
          // icon={<MaterialIcons name="filter-list" size={30} color="white" />}
        />
        <Selectable
          title={'Ville'}
          value={city}
          onPress={() =>
            navigation.navigate({
              name: 'Cities',
              params: {
                isFilter: true,
              },
            })
          }
          // icon={
          //   <MaterialCommunityIcons
          //     name="flag-outline"
          //     size={30}
          //     color="white"
          //   />
          // }
        />
      </View>
    </BottomSheet>
  );
};
