import './App.css';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  console.log('App loaded: React Router navigation enabled');
  return (
    <div className="App container-lg py-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent shadow-sm rounded mb-4">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src="/octofitapp-small.svg" alt="Octofit logo" className="app-logo" />
            <div>
              <div className="fw-bold">Octofit Tracker</div>
              <small className="text-muted">Fitness backend dashboard</small>
            </div>
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

      <div className="card hero-card border-0 shadow-sm mb-4">
        <div className="card-body p-4 p-md-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="dashboard-title mb-3">Octofit Tracker</h1>
              <p className="dashboard-subtitle text-muted mb-4">
                Track users, activities, teams, workouts, and leaderboard stats with a clean React dashboard powered by Django REST API.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge hero-badge bg-primary">API-first</span>
                <span className="badge hero-badge bg-secondary">Bootstrap UI</span>
                <span className="badge hero-badge bg-info text-dark">React Router</span>
                <span className="badge hero-badge bg-success text-dark">Codespace-ready</span>
              </div>
              <p className="mb-0 text-muted">
                Use the navigation menu above to load the latest data for each resource. The app automatically adapts to paginated and plain array responses.
              </p>
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className="p-4 rounded-4 bg-primary bg-opacity-10 border border-primary border-opacity-10">
                <h2 className="h5 text-white mb-3">Realtime Dashboard</h2>
                <ul className="list-unstyled text-muted mb-0">
                  <li className="mb-2">• Live REST API data from Django backend</li>
                  <li className="mb-2">• Styled Bootstrap tables and cards</li>
                  <li className="mb-2">• Navigation for Activities, Users, Teams, Workouts, Leaderboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

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
