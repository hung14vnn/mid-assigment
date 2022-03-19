import './App.css';
import BookDetail from './component/Home/bookdetail';
import HomePageTest from './component/Home/homepagetest';
import {Navigation} from './component/navigation';
import Login from './component/Login/login';
import YourRequest from './component/Home/yourrequest';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './component/Login/signup';
import DeleteRequest from './component/Home/deleterequest';
import Manage from './component/Home/manage';
import UpdateUser from './component/Home/updateuser';

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
        <Route path="/updateuser/:id" element={<UpdateUser />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
