import './App.css';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App container-lg py-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent shadow-sm rounded mb-4">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src="/octofitapp-small.svg" alt="Octofit logo" className="app-logo" />
            <span>Octofit Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
