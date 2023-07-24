import CalendarIcon from '../assets/CalendarIcon.svg';
import StopwatchIcon from '../assets/StopwatchIcon.svg';
import StopIcon from '../assets/StopIcon.svg';
import Button from '../components/Button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import BaseLayout from '../layouts/BaseLayout';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import Timer from '../components/Timer';
import {Tracker} from '../types';
import {getTodaysDate, secondsToTime, timeToSeconds} from '../utils';
import {addDoc, getDocs, deleteDoc, collection, doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../firebase';
import ActionButtons from '../components/ActionButtons';

const TrackersPage = () => {
  const {day, month, year} = getTodaysDate();
  const [trackersList, setTrackersList] = useState<Tracker[]>([]);
  const [activeTimerId, setActiveTimerId] = useState<string | null>();
  const [elapsedTimes, setElapsedTimes] = useState<{[key: string]: number}>({});
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [descriptionText, setDescriptionText] = useState<string>('');

  useEffect(() => {
    fetchTrackers();
  }, []);

  const fetchTrackers = async () => {
    const querySnapshot = await getDocs(collection(db, 'trackers'));
    const trackersArr: Tracker[] = [];

    querySnapshot.forEach((doc) => {
      const trackerData: Tracker = {id: doc.id, ...doc.data()} as Tracker;
      trackersArr.push(trackerData);
    });

    setTrackersList(trackersArr);
    setActiveTimerId(null);
  };

  const handleAddNewTracker = async () => {
    const newTrackerData = {
      timeLogged: '00:00:00',
      description: 'New Tracker',
    };

    const newTrackerRef = await addDoc(collection(db, 'trackers'), newTrackerData);
    const newTrackerSnapshot = await getDoc(newTrackerRef);
    const newTracker: Tracker = {id: newTrackerSnapshot.id, ...newTrackerSnapshot.data()} as Tracker;

    setTrackersList((prev) => [...prev, newTracker]);
  };

  const handleStartOrPauseTimer = (id: string) => {
    setActiveTimerId((prevId) => (prevId === id && isTracking ? null : id));
    setIsTracking(true);

    if (activeTimerId === id && isTracking) {
      setIsTracking(false);
    }
  };

  const handleStopTimer = async (id: string) => {
    setIsTracking(false);
    const selectedTrackerRef = doc(db, 'trackers', id);
    await updateDoc(selectedTrackerRef, {
      timeLogged: secondsToTime(elapsedTimes[id]),
    });

    const trackerToDelete = (await getDoc(selectedTrackerRef)).data();

    await addDoc(collection(db, 'trackersHistory'), trackerToDelete);
    await deleteDoc(doc(db, 'trackers', id));

    setTimeout(() => {
      fetchTrackers();
    }, 1000);
  };

  const handleUpdateElapsedTime = (id: string, elapsedTime: number) => {
    setElapsedTimes((prevElapsedTimes) => ({
      ...prevElapsedTimes,
      [id]: elapsedTime,
    }));
  };

  const handleEditingTracker = (id: string) => {
    setActiveTimerId(id);
    setIsEditing((prev) => !prev);
  };

  const handleEditTrackerSubmit = async () => {
    const editingTrackerRef = doc(db, 'trackers', activeTimerId!);
    await updateDoc(editingTrackerRef, {
      description: descriptionText,
    });
    setIsEditing(false);
    setTimeout(() => {
      fetchTrackers();
    }, 1000);
  };

  const handleDeleteTracker = async (id: string) => {
    await deleteDoc(doc(db, 'trackers', id));
    setTrackersList(trackersList.filter((tracker) => tracker.id !== id));
  };

  const actionButtons = (rowData: Tracker) => (
    <ActionButtons
      activeTimerId={activeTimerId}
      rowDataId={rowData.id}
      startOrPauseTimer={() => handleStartOrPauseTimer(rowData.id)}
      stopTimerAndSave={() => handleStopTimer(rowData.id)}
      editTimer={() => handleEditingTracker(rowData.id)}
      deleteTimer={() => handleDeleteTracker(rowData.id)}
    />
  );

  const timer = (rowData: Tracker) => {
    return (
      <Timer
        id={rowData.id}
        isActive={rowData.id === activeTimerId && isTracking}
        onToggleTimer={handleStartOrPauseTimer}
        elapsedTime={elapsedTimes[rowData.id] || timeToSeconds(rowData.timeLogged)}
        onUpdateElapsedTime={handleUpdateElapsedTime}
      />
    );
  };

  const descInput = (rowData: Tracker) => {
    if (activeTimerId === rowData.id && isEditing) {
      return (
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleEditTrackerSubmit();
          }}
        >
          <input type="text" value={descriptionText} onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionText(e.target.value)} />
        </form>
      );
    }

    return rowData.description;
  };

  return (
    <BaseLayout>
      <div className="p-trackers flex flex-column  h-screen">
        <div className="p-trackers__date w-full flex align-items-center justify-content-start ">
          <img src={CalendarIcon} alt="calendar icon" />
          <span>Today {`(${day}.${month}.${year})`}</span>
        </div>

        <div className="p-trackers__buttons w-100 flex justify-content-end gap-4">
          <Button icon={StopwatchIcon} label="Start new timer" variant="primary" onClick={handleAddNewTracker} />
          <Button icon={StopIcon} label="Stop all" variant="secondary" />
        </div>

        <DataTable className="w-100" value={trackersList} paginator rows={5} tableStyle={{minWidth: '50rem'}}>
          <Column field="timeLogged" header="Time logged" style={{width: '20%'}} body={timer} />
          <Column header="Description" style={{width: '60%'}} body={descInput} />
          <Column header="Actions" style={{width: '20%'}} body={actionButtons} />
        </DataTable>
      </div>
    </BaseLayout>
  );
};

export default TrackersPage;
