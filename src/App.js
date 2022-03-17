import './App.css';
import HomePage from './component/Home/homepage';
import HomePageTest from './component/Home/homepagetest';
import {Navigation} from './component/navigation';
import Login from './component/Login/login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
    <div>
     <Navigation/>
     <Routes>
        <Route path="/"  element={<HomePageTest />} exact/>
        <Route path="/login"  element={<Login />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
