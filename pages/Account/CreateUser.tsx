import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React from 'react';

const CreateAccountFirebase = async (
  name: string,
  phone: string,
  email: string,
  id: string,
  city: string,
) => {
  try {
    firestore().collection('accounts').doc(id).set({
      name,
      phone,
      email,
      id,
      city,
    });
    console.log('added to firebase');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

type Props = {
  name: string;
  phone: string;
  email: string;
  password: string;
  city: string;
};

export const CreateUser = ({name, phone, email, password, city}: Props) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log('signed up');
      await CreateAccountFirebase(name, phone, email, user.uid, city);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};
