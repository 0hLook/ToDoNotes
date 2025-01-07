import React from 'react'
import ProfileInfoCard from './ProfileInfoCard'
import { useNavigate } from 'react-router-dom'

const cl  = () => {

  const nav = useNavigate;

  const onLogout = () => {
    nav("/login");
  };

  return (
    <div className="bg-white flex items center justify-between px-6 py-2">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>

    <ProfileInfoCard onLogout={onLogout}/>    
    </div>
  )
}

export default cl 