import React, {useEffect, useState} from 'react';
import {View, Image, Pressable, Alert} from 'react-native';
import tw from 'twrnc';
import {useDispatch} from 'react-redux';
import {setImagesUrl} from '../InfoSlice';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {CameraIcon} from 'react-native-heroicons/outline';
import {MediaType, launchImageLibrary} from 'react-native-image-picker';

export const ImageField = ({
  id,
  setIsEmpty,
  adImages,
}: {
  id: string;
  adImages?: string[];
  setIsEmpty: (v: boolean) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(adImages ? adImages : []);
  const dispatch = useDispatch<any>();
  const url = `pictures/` + id + `/`;

  useEffect(() => {
    if (images.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [images]);

  const removeImage = async (index: number) => {
    if (images.length > 1) {
      const uri = images[index];
      let filename;
      if (images.length > 0) {
        const startIndex = uri.lastIndexOf('%2F') + 3;
        const endIndex = uri.indexOf('?alt=media&token=');

        filename = uri.substring(startIndex, endIndex);
      } else {
        const parts = uri.split('/');
        filename = parts[parts.length - 1];
      }
      try {
        const ref = storage().ref(url + filename);
        await ref.delete();
        console.log(
          `Image successfully removed from Firebase Storage: ${filename}`,
        );

        const updatedArray = [...images];
        updatedArray.splice(index, 1);
        const updateAd = firestore().collection('posts').doc(id);
        await updateAd.update({
          imagesUrl: updatedArray,
        });
        setImages(updatedArray);
      } catch (error) {
        console.error(
          `Failed to remove image from Firebase Storage: ${filename}`,
          error,
        );
      }

      images.splice(index, 1);
      dispatch(setImagesUrl(images));
    } else Alert.alert('you must have at least one image');
  };

  const pickImage = async () => {
    let options = {
      includeBase64: true,
      mediaType: 'photo' as MediaType,
    };
    const result = await launchImageLibrary(options);
    // console.log(result);
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   // We can specify whether we need only Images or Videos
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    //   // 0 means compress for small size, 1 means compress for maximum quality
    // });
    if (
      !result.didCancel &&
      result.assets &&
      result.assets[0].uri &&
      result.assets[0].fileName
    ) {
      const imageUri = result.assets[0].uri;
      const image = result.assets[0].fileName;
      console.log(id);
      console.log(imageUri, image);
      uploadImage(imageUri, image);
    }
  };

  const uploadImage = async (imageUri: string, image: string) => {
    const blob = await new Promise<Blob>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response as Blob);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUri, true);
      xhr.send(null);
    });
    const ref = storage()
      .ref()
      .child(url + image);
    const snapshot = ref.put(blob);

    snapshot.on(
      'state_changed',
      () => {
        setUploading(true);
      },
      error => {
        setUploading(false);
        console.log(error);
        return;
      },
      () => {
        snapshot.snapshot?.ref.getDownloadURL().then(async url => {
          setUploading(false);
          const updateAd = firestore().collection('posts').doc(id);
          setImages([...images, url]);
          if (images!.length < 1)
            await updateAd.set({
              id,
              imagesUrl: [...images, url],
            });
          else
            await updateAd.update({
              imagesUrl: [...images, url],
            });
          dispatch(setImagesUrl(images));

          return;
        });
      },
    );
  };

  return (
    <View style={tw`flex flex-row gap-2 flex-wrap my-6`}>
      {images.map((image, i) => (
        <Pressable key={i} onPress={() => removeImage(i)}>
          <Image source={{uri: image}} style={tw`flex w-27 h-27 `} />
        </Pressable>
      ))}

      <Pressable onPress={pickImage}>
        <View
          style={tw`flex w-27 h-27 justify-center border border-dashed border-black bg-white`}>
          {<CameraIcon size={60} color="#52525b" style={tw`self-center  `} />}
        </View>
      </Pressable>
      {Array.from({length: 7 - images.length}, (_, index) => index + 1).map(
        i => (
          <View
            key={i}
            style={tw`flex w-27 h-27 justify-center border border-dashed border-black bg-white`}></View>
        ),
      )}
    </View>
  );
};
