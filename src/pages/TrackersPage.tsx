import CalendarIcon from '../assets/CalendarIcon.svg';
import StopwatchIcon from '../assets/StopwatchIcon.svg';
import StopIcon from '../assets/StopIcon.svg';
import Button from '../components/Button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import BaseLayout from '../layouts/BaseLayout';
import {useEffect, useState} from 'react';
import Timer from '../components/Timer';
import {Tracker} from '../types';
import {getTodaysDate, timeToSeconds} from '../utils';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../firebase';
import {v4 as uuidv4} from 'uuid';
import ActionButtons from '../components/ActionButtons';
import {fetchTrackers} from '../services/trackerServices';

const TrackersPage = () => {
  const [trackersList, setTrackersList] = useState<Tracker[]>([]);
  const [activeTimerId, setActiveTimerId] = useState<string | null>();
  const {day, month, year} = getTodaysDate();

  useEffect(() => {
    fetchTrackers(db)
      .then((trackersArr) => {
        setTrackersList(trackersArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trackersList.length]);

  const handleAddNewTracker = async () => {
    await addDoc(collection(db, 'trackers'), {
      id: uuidv4(),
      timeLogged: '00:00:00',
      description: 'New Tracaker',
    });

    fetchTrackers(db);
  };

  const actionButtons = ({id}: Tracker) => (
    <ActionButtons
      activeTimerId={activeTimerId}
      rowDataId={id}
      startOrPauseTimer={activeTimerId !== id ? () => setActiveTimerId(id) : () => setActiveTimerId(null)}
      stopTimerAndSave={() => {}}
      editTimer={() => {}}
      deleteTimer={() => {}}
    />
  );

  const timer = ({id, timeLogged}: Tracker) => <Timer id={id} timeLogged={timeToSeconds(timeLogged)} isActive={id === activeTimerId} />;

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
          <Column field="timeLogged" header="Time logged" style={{width: '20%'}} body={timer}></Column>
          <Column field="description" header="Description" style={{width: '60%'}}></Column>
          <Column header="Actions" style={{width: '20%'}} body={actionButtons}></Column>
        </DataTable>
      </div>
    </BaseLayout>
  );
};

export default TrackersPage;
