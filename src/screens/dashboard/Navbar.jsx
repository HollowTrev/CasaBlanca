import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    document.getElementById("logout_modal").showModal();
  };
  
  const navigate = useNavigate();
  
  const profile = () => {
    document.getElementById("profile").showModal();
  };

  
 
 
  return (

    <div className="static bg-red-800 navbar">
          <div className="flex-1"
           onClick={() => {
            navigate("/");
          }}>
          <h1 className='text-4xl font-bold text-white cursor-pointer ' >CASA BLANCA</h1>
          </div>
          <div className="dropdown dropdown-end">
          
          <div tabIndex={0} role="button" className="mr-4 btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full mr">
              <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[100] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
    </div>



  );
};

export default Navbar;