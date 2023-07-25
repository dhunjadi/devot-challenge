import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import TrackersPage from './pages/TrackersPage';
import TrackersHistoryPage from './pages/TrackersHistoryPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/trackers" element={<TrackersPage />} />
          <Route path="/history" element={<TrackersHistoryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
