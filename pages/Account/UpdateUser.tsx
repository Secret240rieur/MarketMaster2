import firestore from '@react-native-firebase/firestore';
import React from 'react';

type Props = {
  name: string;
  phone: string;
  id: string;
  city: string;
};

export const UpdateUser = async ({name, phone, id, city}: Props) => {
  const accountUpdate = firestore().collection('accounts').doc(id);
  try {
    console.log('updating doc: ' + id);
    await accountUpdate.update({
      name,
      phone,
      city,
    });
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};
