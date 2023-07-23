import PlayIconOrange from '../assets/PlayIconOrange.svg';
import PauseIconOrange from '../assets/PauseIconOrange.svg';
import StopIconBlue from '../assets/StopIconBlue.svg';
import PencilIconBlue from '../assets/PencilIconBlue.svg';
import TrashIconBlue from '../assets/TrashIconBlue.svg';

interface ActionButtonsProps {
  activeTimerId: string | null | undefined;
  rowDataId: string;
  startOrPauseTimer: (id: string) => void;
  stopTimerAndSave: () => void;
  editTimer: () => void;
  deleteTimer: () => void;
}

const ActionButtons = ({activeTimerId, rowDataId, startOrPauseTimer, stopTimerAndSave, editTimer, deleteTimer}: ActionButtonsProps) => {
  return (
    <div className="p-trackers__table_buttons">
      <button onClick={() => startOrPauseTimer(rowDataId)}>
        <img src={activeTimerId !== rowDataId ? PlayIconOrange : PauseIconOrange} alt="orange play/pause icon" />
      </button>

      <button onClick={stopTimerAndSave}>
        <img src={StopIconBlue} alt="blue stop icon" />
      </button>

      <button onClick={editTimer}>
        <img src={PencilIconBlue} alt="blue pencil icon" />
      </button>

      <button onClick={deleteTimer}>
        <img src={TrashIconBlue} alt="blue trash icon" />
      </button>
    </div>
  );
};

export default ActionButtons;
