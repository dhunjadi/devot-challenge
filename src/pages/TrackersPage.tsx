import CalendarIcon from '../assets/CalendarIcon.svg';
import StopwatchIcon from '../assets/StopwatchIcon.svg';
import StopIcon from '../assets/StopIcon.svg';
import Button from '../components/Button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import PlayIconOrange from '../assets/PlayIconOrange.svg';
import PauseIconOrange from '../assets/PauseIconOrange.svg';
import StopIconBlue from '../assets/StopIconBlue.svg';
import PencilIconBlue from '../assets/PencilIconBlue.svg';
import TrashIconBlue from '../assets/TrashIconBlue.svg';
import BaseLayout from '../layouts/BaseLayout';
import {useState} from 'react';
import Timer from '../components/Timer';
import {TrackerData} from '../types';
import {getTodaysDate, timeToSeconds} from '../utils';

const TrackersPage = () => {
  const [activeTimerId, setActiveTimerId] = useState<string | null>();
  const {day, month, year} = getTodaysDate();

  const handleStartTimer = (id: string) => {
    setActiveTimerId(id);
  };

  const handlePauseTimer = () => {
    setActiveTimerId(null);
  };

  const handleStopAndSaveTimer = () => {
    setActiveTimerId(null);
  };

  const data = [
    {id: '1', timeLogged: '01:23:33', description: 'Task 123 Jira lorem ipsum dolor sit amet'},
    {id: '2', timeLogged: '01:23:33', description: 'Task 123 Jira Lorem Ipsum is simply dummy text of the'},
    {id: '3', timeLogged: '01:23:33', description: 'Lorem Ipsum has been the i'},
    {id: '4', timeLogged: '01:23:33', description: 'Task 123 Jira lorem ipsum dolor sit amet'},
    {id: '5', timeLogged: '01:23:33', description: 'Task 123 Jira Lorem Ipsum is simply dummy text of the'},
    {id: '6', timeLogged: '01:23:33', description: 'Lorem Ipsum has been the i'},
  ];

  const actionButtonsTemplate = (rowData: TrackerData) => (
    <div className="p-trackers__table_buttons">
      <button onClick={activeTimerId !== rowData.id ? () => handleStartTimer(rowData.id) : () => handlePauseTimer()}>
        <img src={activeTimerId !== rowData.id ? PlayIconOrange : PauseIconOrange} alt="orange play/pause icon" />
      </button>

      <button onClick={() => handleStopAndSaveTimer()}>
        <img src={StopIconBlue} alt="blue stop icon" />
      </button>

      <button>
        <img src={PencilIconBlue} alt="blue pencil icon" />
      </button>

      <button>
        <img src={TrashIconBlue} alt="blue trash icon" />
      </button>
    </div>
  );

  const timeLoggedTemplate = (rowData: TrackerData) => (
    <Timer id={rowData.id} timeLogged={timeToSeconds(rowData.timeLogged)} isActive={rowData.id === activeTimerId} />
  );

  return (
    <BaseLayout>
      <div className="p-trackers flex flex-column  h-screen">
        <div className="p-trackers__date w-full flex align-items-center justify-content-start ">
          <img src={CalendarIcon} alt="calendar icon" />
          <span>Today {`(${day}.${month}.${year})`}</span>
        </div>

        <div className="p-trackers__buttons w-100 flex justify-content-end gap-4">
          <Button icon={StopwatchIcon} label="Start new timer" variant="primary" />
          <Button icon={StopIcon} label="Stop all" variant="secondary" />
        </div>

        <DataTable className="w-100" value={data} paginator rows={5} tableStyle={{minWidth: '50rem'}}>
          <Column field="timeLogged" header="Time logged" style={{width: '20%'}} body={timeLoggedTemplate}></Column>
          <Column field="description" header="Description" style={{width: '60%'}}></Column>
          <Column header="Actions" style={{width: '20%'}} body={actionButtonsTemplate}></Column>
        </DataTable>
      </div>
    </BaseLayout>
  );
};

export default TrackersPage;
