import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterForm from './components/RegistractionForm';
import HomePage from './components/HomePage';
import PlayerDisplay from './components/PlayerDisplay';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/players" element={<PlayerDisplay />}></Route>
      </Routes>
    </Router>
  )
}

export default App;