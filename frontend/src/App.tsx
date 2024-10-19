import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Navbar from './components/Navbar';
import Login from './containers/Auth/Login.tsx';
import Registration from './containers/Auth/Registration.tsx';
import MyCocktails from './containers/MyCocktails.tsx';
import NotFound from './components/NotFound.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './app/store.ts';
import CocktailInfo from './containers/CocktailInfo.tsx';
import CreateForm from './containers/CreateForm.tsx';

const App = () => {
  const loader = useSelector((state: RootState) => state.Cocktail.loader);

  return(
    <>
      <div>
        <div id="loader-container" style={{ display: loader ? 'block' : 'none' }}>
          <div className="loader"></div>
        </div>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={(
              <Home />
          )} />
          <Route path="/login" element={(
              <Login />
          )} />
          <Route path="/registration" element={(
              <Registration />
          )} />
          <Route path="/myCocktails" element={(
              <MyCocktails />
          )} />
          <Route path="/createCocktail" element={(
              <CreateForm />
          )} />
          <Route path="/cocktail/:id" element={(
              <CocktailInfo/>
          )} />
          <Route path="*" element={(
              <NotFound />
          )} />
        </Routes>
      </div>
    </>
  );
};

export default App;
