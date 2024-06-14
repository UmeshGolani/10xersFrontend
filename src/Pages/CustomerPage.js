import React from 'react'
import Header from '../Components/Header'
import Customer from '../Components/Customer'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'

const CustomerPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <div>
        <Header heading="Customer Page" eventName='Login' handleEvent={handleLogin}/>
        <Customer/>
        <Footer/>
    </div>
  )
}

export default CustomerPage