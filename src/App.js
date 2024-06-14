import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
// import AdminHomePage from './Pages/AdminHomePage';
import AdminPage from './Pages/AdminPage';

import CustomerPage from './Pages/CustomerPage';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/admin' Component={AdminPage}/>
        <Route path='/' Component={CustomerPage}/>
        <Route path='/register' Component={Register}/>
        <Route path='/login' Component={Login}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
