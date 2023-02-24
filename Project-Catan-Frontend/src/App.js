import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterForm from './components/RegistractionForm';
import HomePage from './components/HomePage';
import PlayerDisplay from './components/PlayerDisplay';
import SignIn from './components/Signin';
import AbundancesDisplay from './components/AbundancesDisplay'
import './App.css';
import AddAbundance from './components/AddAbundance';
import AddFutures from './components/AddFutures';
import AdminControl from './components/AdminControl';
import FuturesDisplay from './components/FuturesDisplay';
import ChangeTurn from './components/ChangeTurn';
import UpdateFutures from './components/UpdateFutures';
import DeletePlayer from './components/DeletePlayer';
import DeleteAbundance from './components/DeleteAbundance';
import DeleteFuture from './components/DeleteFuture';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/players" element={<PlayerDisplay />}></Route>
        <Route path="/abundances" element={<AbundancesDisplay />}></Route>
        <Route path="/abundanceform" element={<AddAbundance />}></Route>
        <Route path='/futureform' element={<AddFutures />}></Route>
        <Route path='/admin' element={<AdminControl />}></Route>
        <Route path='/futures' element={<FuturesDisplay />}></Route>
        <Route path='/changeturn' element={<ChangeTurn />}></Route>
        <Route path='/updatefutures' element={<UpdateFutures />}></Route>
        <Route path='/deleteplayer' element={<DeletePlayer />}></Route>
        <Route path='/deleteabundance' element={<DeleteAbundance />}></Route>
        <Route path='/deletefuture' element={<DeleteFuture />}></Route>
      </Routes>
    </Router>
  )
}

export default App;