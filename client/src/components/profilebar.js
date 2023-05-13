import React, { useState, useEffect } from 'react';
import "../profilebar.css";
import axios from 'axios';
function ProfileBar() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userId = response.headers.get('userId');
      axios.get(`/api/users/${userId}`)
        .then((res) => {
          setRole(res.data.Role);
          console.log(res.data.Role);
        
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  return (
    <header className="profilebar">
      <div className="nav-wrap">
        <nav className="main-nav" role="navigation">
          <ul className="unstyled list-hover-slide">
            <li><a href="/profileuser">Edit profile</a></li>
            {role === 'candidat' ? (
              <>
              <li><a href="/profile">Offres soumises</a> </li>
                <li><a href="/candidatform">Consulter CV </a></li>
                </>
            ) : (
              null
            )}
            
            <li><a href="/Notification">Notifications </a></li>

          </ul>
        </nav>
      </div>
    </header>
  );
}

export default ProfileBar;