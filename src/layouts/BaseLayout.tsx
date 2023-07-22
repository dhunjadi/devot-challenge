import {ReactNode} from 'react';
import Header from '../components/Header';
interface BaseLayoutProps {
  children: ReactNode;
}
const BaseLayout = ({children}: BaseLayoutProps) => {
  return (
    <div className="l-base">
      <Header showLinks />
      {children}
    </div>
  );
};

export default BaseLayout;
