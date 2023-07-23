import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBN6mpmpJcz0hfuEJq2nany_wt8muR41vk',
  authDomain: 'devoot-challenge.firebaseapp.com',
  projectId: 'devoot-challenge',
  storageBucket: 'devoot-challenge.appspot.com',
  messagingSenderId: '749383824768',
  appId: '1:749383824768:web:c7040c9c96ba8f27f7fd65',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
