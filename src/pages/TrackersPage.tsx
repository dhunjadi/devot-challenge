import Header from '../components/Header';
import CalendarIcon from '../assets/CalendarIcon.svg';
import StopwatchIcon from '../assets/StopwatchIcon.svg';
import StopIcon from '../assets/StopIcon.svg';
import Button from '../components/Button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import PauseIconOrange from '../assets/PauseIconOrange.svg';
import StopIconBlue from '../assets/StopIconBlue.svg';
import PencilIconBlue from '../assets/PencilIconBlue.svg';
import TrashIconBlue from '../assets/TrashIconBlue.svg';

const TrackersPage = () => {
  const actionButtons = (
    <div className="p-trackers__table_buttons">
      <button>
        <img src={PauseIconOrange} alt="orange pause icon" />
      </button>

      <button>
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
  const data = [
    {timeLogged: '01:23:33', description: 'Task 123 Jira lorem ipsum dolor sit amet', actions: actionButtons},
    {timeLogged: '01:23:33', description: 'Task 123 Jira Lorem Ipsum is simply dummy text of the', actions: actionButtons},
    {timeLogged: '01:23:33', description: "Lorem Ipsum has been the industry's standard dummy text ever since", actions: actionButtons},
  ];

  return (
    <>
      <Header showLinks />
      <div className="p-trackers">
        <div className="p-trackers__date">
          <img src={CalendarIcon} alt="calendar icon" />
          <span>Today {`(1.12.2021.)`}</span>
        </div>

        <div className="p-trackers__buttons">
          <Button icon={StopwatchIcon} variant="primary">
            Start new timer
          </Button>
          <Button icon={StopIcon} variant="secondary">
            Stop all
          </Button>
        </div>

        <DataTable value={data} paginator rows={5} tableStyle={{minWidth: '50rem'}}>
          <Column field="timeLogged" header="Time logged" style={{width: '20%'}}></Column>
          <Column field="description" header="Description" style={{width: '60%'}}></Column>
          <Column field="actions" header="Actions" style={{width: '20%'}}></Column>
        </DataTable>
      </div>
    </>
  );
};

export default TrackersPage;
