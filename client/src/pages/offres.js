import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../myoffres.css"
import { Link, useLocation, useNavigate } from "react-router-dom";



const OffresList = () => {
  const [offres, setOffres] = useState([]);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get('keyword');
  const location = searchParams.get('location');
  const type = searchParams.get('type');
  const [role, setRole] = useState('');
  const navigate=useNavigate()
  useEffect(() => {
    axios.get('/api/offres')
      .then(res => {
       
        let filteredOffres = res.data;
        if (keyword) {
          filteredOffres = filteredOffres.filter(offre =>
            offre.mot_cles.includes(keyword)
          );
        }
        if (type) {
          filteredOffres = filteredOffres.filter(offre =>
            offre.type.includes(type)
          );
        }
        if (location) {
          filteredOffres = filteredOffres.filter(offre =>
            offre.lieu.includes(location)
          );
        }
        setOffres(filteredOffres);
      })
      .catch(err => console.log(err));
  
  
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
  } , [keyword, location]);
  const handleKeywordClick = (mot_cle) => {
    navigate(`/offre?keyword=${mot_cle}`);
  }
  const handleCandidaturesClick = (offreId) => {
    axios.get(`/api/offres/${offreId}/candidatures`)
      .then(res => {
        console.log(res.data);
        // TODO: Render the list of candidatures for this offer
      })
      .catch(err => console.log(err));
  }
  return (
    
	<div className="wrapper">
      <h1>Liste des offres </h1>
      {role === 'employee' && (
      <div className='badgeoffre'>
      <Link to={"/addoffre"}>
                  <span className="badge bg-primary">
                    <i className="fas fa-plus"></i>
                  </span>
      </Link>
      </div>
      )}
      <ul id="timeline">
      {offres.map(offre => (
        <li className="listing clearfix" key={offre._id}>
        
          <div className="info">
            <span className="job_title">{offre.name}</span> 
            <span className="job_info">{offre.type}</span>
            <p className='lieu'><img  src={require("../sources/logo.jpg")} width="50" height="50" />{offre.lieu}</p> 
            <p className='keywords'>Mots clés:</p>{offre.mot_cles && offre.mot_cles.split(',').map((mot_cle, index) => (
    <button key={index} className="btn1" onClick={() => handleKeywordClick(mot_cle)} >{mot_cle}</button> 
            ))}
          </div>
          <div className="link-container">
           <Link to={`/offres/${offre._id}`} >
           <button className='btn-primary'>Détails </button>
     
            </Link>
            {role === 'employee' && (
                <Link to={`/offres/${offre._id}/candidatures`}>
                  <button className='btn-primary'>Candidatures </button>
                </Link>
              )}
            </div>
        </li>
        ))}
      </ul>
    </div>
    
    
  );
};

export default OffresList;