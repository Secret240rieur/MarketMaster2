import {Alert} from 'react-native';
import storage from '@react-native-firebase/storage';

export const getConversationId = (a: string, b: string, c: string) => {
  if (a.substring(0, 1).codePointAt(0)! > b.substring(0, 1).codePointAt(0)!) {
    return `${b}${a}${c}`;
  } else {
    return `${a}${b}${c}`;
  }
};

export const removeImagesFolder = async (id: string) => {
  const ref = storage().ref('pictures/' + id);
  const folderExists = await ref.listAll();

  if (folderExists.items.length === 0) {
    console.log('Folder does not exist.');
    return;
  }
  const files = await ref.listAll();

  // Delete all files and subfolders within the "pictures" folder
  await Promise.all(files.items.map(fileRef => fileRef.delete()));

  // Delete the "pictures" folder
  await ref.delete();
};

type Props = {
  title: string;
  message: string;
  onpress: () => void;
};

export const createTwoButtonAlert = ({title, message, onpress}: Props) =>
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: onpress},
  ]);
