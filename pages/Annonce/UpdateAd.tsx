import firestore from '@react-native-firebase/firestore';
import React from 'react';

type Props = {
  title: string;
  price: number;
  description: string;
  category: string;
  city: string;
  id: string;
  isActive: boolean;
  deleted: boolean;
};
export const UpdateAd = async ({
  title,
  category,
  city,
  description,
  price,
  id,
  isActive,
  deleted,
}: Props) => {
  const updateAd = firestore().collection('posts').doc(id);
  try {
    console.log('updating doc: ' + id);
    await updateAd.update({
      title,
      price,
      description,
      category,
      city,
      isActive,
      deleted,
    });
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};
