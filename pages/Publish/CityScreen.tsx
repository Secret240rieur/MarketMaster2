import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setCity, setCityFilter} from '../InfoSlice';
import {List} from './List';
import React from 'react';

export const CityScreen = ({route}: any) => {
  const cities = ['Tout le Maroc', 'Tetouan', 'Tanger', 'Casablanca', 'Rabat'];
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const selectCity = (value: string) => {
    if (route.params?.isFilter) dispatch(setCityFilter(value));
    else dispatch(setCity(value));
    navigation.goBack();
  };

  return (
    <List
      title={'Ville'}
      list={cities}
      onPress={selectCity}
      txtColor={route.params?.txtColor}
      icnColor={route.params.icnColor}
    />
  );
};
