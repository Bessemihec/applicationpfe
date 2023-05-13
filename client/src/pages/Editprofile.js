import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../UserProfileedit.css';
import ProfileBar from '../components/profilebar';
import { Link } from 'react-router-dom';
const UserProfile = () => {
  const [user, setUser] = useState({
    Firstname: '',
    Lastname: '',
    Email: '',
    Age: '',
    Phone: '',
    Adress: '',
    
  });

  const [editing, setEditing] = useState(false);

  const getUserId = async () => {
    try {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const userId = response.headers.get('userId');
      return userId;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId();
      axios
        .get(`/api/users/${userId}`)
        .then((response) => {
          const userData = response.data;
          setUser({
            Firstname: userData.Firstname,
            Lastname: userData.Lastname,
            Email: userData.Email,
            Age: userData.Age,
            Phone: userData.Phone,
            Adress: userData.Adress,
           
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    
    setUser(() => ({
      ...user,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = await getUserId();
      const response = await axios.put(`/api/users/${userId}`, user);

      // Handle the response from your server
      console.log(response.data);

      setEditing(false);
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = async () => {
    const userId = await getUserId();
    axios
      .get(`/api/users/${userId}`)
      .then((response) => {
        const userData = response.data;
        setUser({
          Firstname: userData.Firstname,
          Lastname: userData.Lastname,
          Email: userData.Email,
          Age: userData.Age,
          Phone: userData.Phone,
          Adress: userData.Adress,
        });
        setEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='containeredit'>
      
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="Firstname"
              value={user.Firstname}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="Lastname"
              value={user.Lastname}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="Email"
              value={user.Email}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              name="Age"
              value={user.Age}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="Phone"
              value={user.Phone}
              onChange={handleChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="Adress"
              value={user.Adress}
              onChange={handleChange}
            />
          </label>
        
         
          <div>
          <button type="submit">Save</button>
          <button
 type="button"
 className='btn-secondary'
 onClick={handleCancel}
>
 Cancel
</button>
</div>
</form>
) : (
<div className="profile">
<ProfileBar/>
     <div className="card">
     
         <div className="card-body">
             
             <table>
                 <tbody>
                     <tr>
                         <td>First Name</td>
                         <td>:</td>
                         <td>{user.Firstname}</td>
                       
                     </tr>
                   <td>Last Name</td>
                         <td>:</td>
                         <td>{user.Lastname}</td>
                     <tr>
                         <td>Email</td>
                         <td>:</td>
                         <td>{user.Email} </td>
                     </tr>
                     <tr>
                         <td>Adress</td>
                         <td>:</td>
                         <td>{user.Adress}</td>
                     </tr>
                     <tr>
                         <td> Phone</td>
                         <td>:</td>
                         <td>{user.Phone}</td>
                     </tr>
                     <tr>
                         <td>Age</td>
                         <td>:</td>
                         <td>{user.Age}</td>
                     </tr>
                    
                 </tbody>
               
             </table>
             <div>
             <span className="badge bg-success badg" >
        <i className="fas fa-edit" onClick={handleEdit}></i>
      </span>
      </div>
         </div>
     </div>
     </div>
)}
</div>
);
};

export default UserProfile;