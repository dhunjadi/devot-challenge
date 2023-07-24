export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  confirmPassword: string;
}

export interface Tracker {
  id: string;
  timeLogged: string;
  description: string;
  createdAt: string;
}

export interface TimerProps {
  id: string;
  isActive: boolean;
  onToggleTimer: (id: string) => void;
  onUpdateElapsedTime: (id: string, elapsedTime: number) => void;
  elapsedTime: number;
}

export interface TodaysDate {
  day: number;
  month: number;
  year: number;
}
