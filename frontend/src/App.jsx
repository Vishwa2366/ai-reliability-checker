import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import './styles.css'

export default function App() {
  const [history, setHistory] = useState([])

  const addToHistory = (entry) => setHistory((prev) => [...prev, entry])

  return (
    <BrowserRouter>
      <nav className="nav">
        <NavLink to="/" className="nav-logo" end>
          <span className="nav-logo-dot" />
          ReliabilityAI
        </NavLink>
        <div className="nav-links">
          <NavLink
            to="/"
            end
            id="nav-home"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            id="nav-dashboard"
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            Dashboard
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home addToHistory={addToHistory} />} />
        <Route path="/dashboard" element={<Dashboard history={history} />} />
      </Routes>
    </BrowserRouter>
  )
}
