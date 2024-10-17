import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './containers/Home';
import Navbar from './components/Navbar';
import Login from './containers/Auth/Login.tsx';
import Registration from './containers/Auth/Registration.tsx';

const App = () => {
  return(
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={(
            <Home/>
          )}/>
          <Route path="/login" element={(
            <Login/>
          )}/>
          <Route path="/registration" element={(
            <Registration/>
          )}/>
        </Routes>
      </div>
    </>
  )
};

export default App
