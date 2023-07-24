import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import {InputText} from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import BaseLayout from '../layouts/BaseLayout';
import {getDocs, collection, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import {db} from '../firebase';
import {Tracker} from '../types';
import ActionButtons from '../components/ActionButtons';

const TrackersHistoryPage = () => {
  const [trackersList, setTrackersList] = useState<Tracker[]>([]);
  const [activeTrackerId, setActiveTimerId] = useState<string | null>();
  const [startDate, setStartDate] = useState<string | Date | Date[] | null>();
  const [endDate, setEndDate] = useState<string | Date | Date[] | null>();
  const [inputText, setInputText] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [descriptionText, setDescriptionText] = useState<string>('');

  useEffect(() => {
    fetchTrackers();
  }, []);

  const fetchTrackers = async () => {
    const querySnapshot = await getDocs(collection(db, 'trackersHistory'));
    const trackersArr: Tracker[] = [];

    querySnapshot.forEach((doc) => {
      const trackerData: Tracker = {id: doc.id, ...doc.data()} as Tracker;
      trackersArr.push(trackerData);
    });

    setTrackersList(trackersArr);
    setActiveTimerId(null);
  };

  const handleEditingTracker = (id: string) => {
    setActiveTimerId(id);
    setIsEditing((prev) => !prev);
  };

  const handleEditTrackerSubmit = async () => {
    const editingTrackerRef = doc(db, 'trackersHistory', activeTrackerId!);
    await updateDoc(editingTrackerRef, {
      description: descriptionText,
    });
    setIsEditing(false);
    setTimeout(() => {
      fetchTrackers();
    }, 1000);
  };

  const handleDeleteTracker = async (id: string) => {
    await deleteDoc(doc(db, 'trackersHistory', id));
    setTrackersList(trackersList.filter((tracker) => tracker.id !== id));
  };

  const actionButtons = (rowData: Tracker) => (
    <ActionButtons
      activeTrackerId={activeTrackerId}
      rowDataId={rowData.id}
      editTimer={() => handleEditingTracker(rowData.id)}
      deleteTimer={() => handleDeleteTracker(rowData.id)}
    />
  );

  const descriptionEditInput = (rowData: Tracker) => {
    if (activeTrackerId === rowData.id && isEditing) {
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

  const filteredData = trackersList.filter((el) => el.description.toLowerCase().includes(inputText.toLowerCase()));

  return (
    <BaseLayout>
      <div className="p-trackersHistory flex flex-column h-screen">
        <div className="p-trackersHistory__title w-full font-bold">Trackers History</div>

        <div className="p-trackersHistory__filter w-full flex justify-content-between gap-7">
          <div className="flex flex-column pair gap-2 w-full">
            <label htmlFor="startDate">Start Date</label>
            <Calendar
              id="startDate"
              value={startDate}
              onChange={(e: CalendarChangeEvent) => setStartDate(e.value)}
              dateFormat="dd.mm.yy"
              showIcon
            />
          </div>

          <div className="flex flex-column gap-2 w-full">
            <label htmlFor="endDate">End Date</label>
            <Calendar
              id="endDate"
              value={endDate}
              onChange={(e: CalendarChangeEvent) => setEndDate(e.value)}
              dateFormat="dd.mm.yy"
              showIcon
            />
          </div>

          <div className="flex flex-column gap-2 w-full">
            <label htmlFor="desc">Description contains</label>
            <span id="desc" className="p-input-icon-right">
              {inputText && <i onClick={() => setInputText('')} className="pi pi-times" />}
              <InputText
                className="w-full"
                value={inputText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
              />
            </span>
          </div>
        </div>

        <DataTable className="w-full" value={filteredData} paginator rows={5} tableStyle={{minWidth: '50rem'}}>
          <Column field="date" header="Date" style={{width: '20%'}} />
          <Column header="Description" style={{width: '50%'}} body={descriptionEditInput} />
          <Column field="timeLogged" header="Time Tracked" style={{width: '20%'}} />
          <Column header="Actions" style={{width: '10%'}} body={actionButtons} />
        </DataTable>
      </div>
    </BaseLayout>
  );
};

export default TrackersHistoryPage;
