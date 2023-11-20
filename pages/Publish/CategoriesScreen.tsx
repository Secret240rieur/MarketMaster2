import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setCategory, setCategoryFilter} from '../InfoSlice';
import {List} from './List';
import React from 'react';

export const CategoriesScreen = () => {
  const route = useRoute<any>();

  const categories = [
    'Toutes les categories',
    'Immobilier',
    'Cars',
    'Electronics',
  ];
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const selectCategory = (value: string) => {
    if (route.params?.isFilter) dispatch(setCategoryFilter(value));
    else dispatch(setCategory(value));
    navigation.goBack();
  };
  return (
    <List
      title={'Catégories'}
      list={categories}
      onPress={selectCategory}
      txtColor={route.params?.txtColor}
      icnColor={route.params.icnColor}
    />
  );
};
