import PlayIconOrange from '../assets/PlayIconOrange.svg';
import PauseIconOrange from '../assets/PauseIconOrange.svg';
import StopIconBlue from '../assets/StopIconBlue.svg';
import PencilIconBlue from '../assets/PencilIconBlue.svg';
import TrashIconBlue from '../assets/TrashIconBlue.svg';

interface ActionButtonsProps {
  activeTrackerId: string | null | undefined;
  rowDataId: string;
  startOrPauseTimer?: (id: string) => void;
  stopTimerAndSave?: (id: string) => void;
  editTimer: () => void;
  deleteTimer: (id: string) => void;
  showStartAndStop?: boolean;
}

const ActionButtons = ({
  activeTrackerId,
  rowDataId,
  startOrPauseTimer = () => {},
  stopTimerAndSave = () => {},
  editTimer,
  deleteTimer,
  showStartAndStop,
}: ActionButtonsProps) => {
  return (
    <div className="c-actionButtons">
      {showStartAndStop && (
        <>
          <button className="cursor-pointer" onClick={() => startOrPauseTimer(rowDataId)}>
            <img src={activeTrackerId !== rowDataId ? PlayIconOrange : PauseIconOrange} alt="orange play/pause icon" />
          </button>

          <button className="cursor-pointer" onClick={() => stopTimerAndSave(rowDataId)}>
            <img src={StopIconBlue} alt="blue stop icon" />
          </button>
        </>
      )}

      <button className="cursor-pointer" onClick={editTimer}>
        <img src={PencilIconBlue} alt="blue pencil icon" />
      </button>

      <button className="cursor-pointer" onClick={() => deleteTimer(rowDataId)}>
        <img src={TrashIconBlue} alt="blue trash icon" />
      </button>
    </div>
  );
};

export default ActionButtons;
