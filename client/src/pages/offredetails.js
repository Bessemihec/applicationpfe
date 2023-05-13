import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import "../offresdetails.css";


const OffreDetails = () => {
    const { id } = useParams();
    const [offre, setOffre] = useState({});
   const [role, setRole] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
      axios.get(`/api/offres/${id}`)
        .then(response => {
          setOffre(response.data);
        })
        .catch(error => {
          console.log(error);
        });
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
    }, [id]);

    const handleDelete = () => {
        axios
          .delete(`/api/offres/${id}`)
          .then(() => {
            window.location.href = '/offre';

          })
          .catch(error => {
            console.log(error);
          });
        }
        const handleUpdate = () => {
            window.location.href = `/offres/${id}/edit`;
          };
          const handlePostuler = () => {
            navigate(`/offres/${id}/postuler`);
          };
          const handleKeywordClick = (mot_cle) => {
            navigate(`/offre?keyword=${mot_cle}`);
          }
  return (
   
    <div class = "card-wrapper">
   
      
     
      <div class = "product-content">
        <h2 class = "product-title">{offre.name}</h2>


      
        <div class = "product-detail">
          <h2>Description </h2>
          <p>{offre.Description}</p>
       
          <ul>
          <li><strong>Entreprise</strong>: {offre.entreprisenom}</li>
            <li><strong>Date</strong>: {offre.date}</li>
            <li><strong >Niveau d'Education : </strong>{offre.niveau_etude}</li>
            <li><strong>Salaire:</strong> {offre.salaire}</li>
            <li><strong>Languages: </strong>{offre.langues}</li>
            <li><strong>Lieu:</strong> {offre.lieu}</li>
            <li><strong>Date d'expiration : </strong>{offre.date_dexpiration}</li>
           
          </ul>
          <h2>Comment Postuler </h2>
          <p>{offre.CommentPostuler}</p>
        </div>

        <div className="purchase-info">
  {offre.mot_cles && offre.mot_cles.split(',').map((mot_cle, index) => (
    <button key={index} className="btn" onClick={() => handleKeywordClick(mot_cle)}>{mot_cle}</button>
  ))}


   </div>
        
  
      
          
          </div>
        
          <div className='badgeoffre'>
          {role === 'employee' && (
          <>
  <span className="badge bg-secondary mr-2" >
    <i className="fas fa-edit" onClick={handleUpdate}></i>
  </span>
        
  <span className="badge bg-danger mr-2" >
    <i className="fas fa-trash" onClick={handleDelete}></i>
   
  </span>
</>
  )}
  {role !== 'employee' && (
  <button className=" btn-success" onClick={handlePostuler}>
 Postuler
  </button>
  )}
</div>
          </div>
          
   
   
  );
};

export default OffreDetails;