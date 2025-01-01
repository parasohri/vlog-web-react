import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import {useNavigate } from 'react-router-dom';
function Logoutbutton() {
  const navigate=useNavigate();
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logout().then(()=>{
          dispatch(logout());
            navigate('/login')
        })
    }
  return (
    <div>
      <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
 onClick={logoutHandler}
 >logout</button>
    </div>
  )
}

export default Logoutbutton
