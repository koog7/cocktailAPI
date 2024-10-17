import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './containers/Home';

const App = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={(
          <Home/>
        )}/>
      </Routes>
    </>
  )
};

export default App
