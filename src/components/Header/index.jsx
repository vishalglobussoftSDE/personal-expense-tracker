import React, { useEffect } from 'react';
import './style.css';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom'; 
import { signOut } from 'firebase/auth';  
import { toast } from 'react-toastify';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); 
    }
  }, [user, loading, navigate]);

  function logout() {
    signOut(auth)
      .then(() => {
        navigate('/');
        toast.success("Logged out successfully.");
      })
      .catch((error) => {
        toast.error("Error logging out. Please try again.");
        console.error("Logout Error: ", error);
      });
  }

  return (
    <div className='navbar'>
      <p className="navbar-heading">Finance App by Globussoft.</p>
      {user && <p className='logo link' onClick={logout}>Logout</p>}
    </div>
  );
};

export default Header;
