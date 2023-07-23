import {Firestore, collection, getDocs} from 'firebase/firestore';
import {Tracker} from '../types';

export const fetchTrackers = async (db: Firestore): Promise<Tracker[]> => {
  const trackersArr: Tracker[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'trackers'));
    querySnapshot.forEach((doc) => {
      trackersArr.push(doc.data() as Tracker);
    });

    return trackersArr;
  } catch (err) {
    console.log(err);
    return [];
  }
};
