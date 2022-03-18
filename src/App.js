import './App.css';
import BookDetail from './component/Home/bookdetail';
import HomePageTest from './component/Home/homepagetest';
import {Navigation} from './component/navigation';
import Login from './component/Login/login';
import YourRequest from './component/Home/yourrequest';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './component/Login/signup';
import DeleteRequest from './component/Home/deleterequest';

function App() {
  
  return (
    <BrowserRouter>
    <div>
     <Navigation/>
     <Routes>
        <Route path="/"  element={<HomePageTest />} exact/>
        <Route path="/login"  element={<Login />}/>
        <Route path="/signup"  element={<Signup />}/>
        <Route path="/:id" element={<BookDetail />} />
        <Route path="/request" element={<YourRequest />} />
        <Route path="/request/:id" element={<DeleteRequest />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
