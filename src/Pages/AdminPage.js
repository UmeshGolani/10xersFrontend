import React from 'react'
import Header from '../Components/Header'
import Admin from '../Components/Admin'
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('admin_id');
    sessionStorage.removeItem('authToken');
    navigate('/');

  };
  return (
    <div>
        <Header heading='Admin Page' handleEvent={handleLogout} eventName='Logout'/>
        <Admin/>
        <Footer/>
        
    </div>
  )
}

export default AdminPage