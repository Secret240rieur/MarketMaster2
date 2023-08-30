import {getValueFor, save} from '../../SecureStore';
import auth from '@react-native-firebase/auth';

export const Signin = async (email?: string, password?: string) => {
  if (email && password) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        save('email', email);
        save('password', password);
        // ...
        // console.log(user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  } else {
    const email = await getValueFor('email');
    const password = await getValueFor('password');
    if (email && password) {
      Signin(email, password);
    }
  }
};
