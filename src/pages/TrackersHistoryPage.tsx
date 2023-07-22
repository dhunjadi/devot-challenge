import Header from '../components/Header';
import PencilIconBlue from '../assets/PencilIconBlue.svg';
import TrashIconBlue from '../assets/TrashIconBlue.svg';
import {useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import {InputText} from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

const TrackersHistoryPage = () => {
  const [startDate, setStartDate] = useState<string | Date | Date[] | null>();
  const [endDate, setEndDate] = useState<string | Date | Date[] | null>();
  const [inputText, setInputText] = useState<string>('');

  const actionButtons = (
    <div className="p-trackersHistory__table_buttons">
      <button>
        <img src={PencilIconBlue} alt="blue pencil icon" />
      </button>

      <button>
        <img src={TrashIconBlue} alt="blue trash icon" />
      </button>
    </div>
  );

  const data = [
    {date: '01:23:33', description: 'Task 123 Jira lorem ipsum dolor sit amet', timeTracked: '05:02:23', actions: actionButtons},
    {timeLogged: '01:23:33', description: 'Task 123 Jira Lorem Ipsum is simply dummy text of the', actions: actionButtons},
    {timeLogged: '01:23:33', description: "Lorem Ipsum has been the industry's standard dummy text ever since", actions: actionButtons},
  ];

  return (
    <>
      <Header showLinks />
      <div className="p-trackersHistory flex flex-column justify-content-center h-screen">
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

        <DataTable className="w-full" value={data} paginator rows={5} tableStyle={{minWidth: '50rem'}}>
          <Column field="date" header="Date" style={{width: '20%'}}></Column>
          <Column field="description" header="Description" style={{width: '50%'}}></Column>
          <Column field="timeTracked" header="Time Tracked" style={{width: '20%'}}></Column>
          <Column field="actions" header="Actions" style={{width: '10%'}}></Column>
        </DataTable>
      </div>
    </>
  );
};

export default TrackersHistoryPage;
