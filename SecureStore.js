import EncryptedStorage from 'react-native-encrypted-storage';

export async function save(key, value) {
  await EncryptedStorage.setItem(key, value);
}

export async function getValueFor(key) {
  return await EncryptedStorage.getItem(key);
}
