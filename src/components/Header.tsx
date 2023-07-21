import Logo from '../assets/Logo.svg';
import {NavLink} from 'react-router-dom';

interface HeaderProps {
  showLinks?: boolean;
}

const Header = ({showLinks}: HeaderProps) => {
  const headerItems = [
    {id: '1', title: 'trackers', label: 'Trackers', url: '/trackers'},
    {id: '2', title: 'history', label: 'History', url: '/trackers/history'},
    {id: '3', title: 'logout', label: 'Logout', url: '/'},
  ];
  return (
    <div className="c-header">
      <div className="c-header__logo">
        <img src={Logo} alt="" />
        <span>Tracking Tool</span>
      </div>

      <div className="c-header__icons">
        {showLinks &&
          headerItems.map((item) => {
            return (
              <div key={item.id} className={`c-header__icons_${item.title}`}>
                <NavLink key={item.id} to={item.url}>
                  {item.label}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Header;
