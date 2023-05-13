import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../myoffres.css"
import { Link, useLocation,useNavigate } from "react-router-dom";

const Offres = () => {
  const [offres, setOffres] = useState([]);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get('keyword');
  const location = searchParams.get('location');
  const type = searchParams.get('type');
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
  }, [keyword, location]);

  const lastfiveOffres = offres.slice(Math.max(offres.length - 5, 0));
  const handleKeywordClick = (mot_cle) => {
    navigate(`/offre?keyword=${mot_cle}`);
  }
  return (
    <div className="border">
    <div className="wrapper">
        <h1>Dernières Offers</h1>
        <ul id="timeline">
        {lastfiveOffres.map(offre => (
          <li className="listing clearfix" key={offre._id}>
          
            <div className="info">
              <span className="job_title">{offre.name}</span> 
              <p className='lieu'><img  src={require("../sources/logo.jpg")} width="50" height="50" />{offre.lieu}</p> 
              <p className='keywords'>Mots clés:</p>{offre.mot_cles && offre.mot_cles.split(',').map((mot_cle, index) => (
    <button key={index} className="btn1" onClick={() => handleKeywordClick(mot_cle)} >{mot_cle}</button> 
            ))}
          </div>
          <div className="link-container">
           <Link to={`/offres/${offre._id}`} >
           <span className="badge bg-primary " >
        <i className="fas fa-info-circle" ></i>
      </span>
      </Link>
      </div>
          </li>
          ))}
        </ul>
      </div>
      </div>
  );
};

export default Offres;