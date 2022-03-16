import './App.css';
import HomePage from './component/Home/homepage';
import {Navigation} from './component/navigation';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
     <Navigation/>
     <Routes>
        <Route path="/"  element={<HomePage />} exact/>
        <Route path="/login"  element={<HomePage />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
