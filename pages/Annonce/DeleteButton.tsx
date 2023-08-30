import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createTwoButtonAlert} from '../../src/Tools';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {TrashIcon} from 'react-native-heroicons/outline';

export const DeleteButton = ({id}: {id: string}) => {
  const navigation = useNavigation<any>();

  const handleDeletePost = async () => {
    const updateAd = firestore().collection('posts').doc(id);
    try {
      await updateAd.update({
        deleted: true,
      });
      navigation.navigate('Home');
    } catch (e) {
      console.error('Error updating document: ', e);
    }

    // const db = firebase.firestore();
    // if (ad?.id) {
    //   await removeImagesFolder(ad?.id);
    //   await db.collection("posts").doc(ad.id).delete();
    // }
  };
  // const createTwoButtonAlert = () =>
  //   Alert.alert("Delete ad", "Are you sure?", [
  //     {
  //       text: "Cancel",
  //       onPress: () => console.log("Cancel Pressed"),
  //       style: "cancel",
  //     },
  //     { text: "OK", onPress: handleDeletePost },
  //   ]);
  return (
    <Pressable
      onPress={() =>
        createTwoButtonAlert({
          title: 'Delete ad',
          message: 'Are you sure?',
          onpress: handleDeletePost,
        })
      }>
      <TrashIcon size={28} color="red" />
    </Pressable>
  );
};
