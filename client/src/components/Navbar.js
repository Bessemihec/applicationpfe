
import React from 'react';
import { Link } from 'react-router-dom';
import '../HomePage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Navbar() {
 


  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState("");
    const navigate = useNavigate();
    let Id=0;
   
    const handleLogout = () => {
     
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    }
  const goprofile=()=>{
    navigate('/profileuser');
  }
  const gologin=()=>{
    navigate('/login');
  }
  const goregistre=()=>{
    navigate('/register');
  }
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

    <nav className="navbar">
      <Link to="/">
        <img src={require("../sources/poste.svg.png")} height={100} alt="banner-image" className="navbar-logo" />
      </Link>
      
      <ul> {role==="admin" ?<li> <a href="/user">users</a></li> : null }
        
        <li><a href="/offre?type=Emploi">Offre d'emploi</a></li>
        <li><a href="/offre?type=Formation">Formation</a></li>

        <li><a href="/offre?type=Stage">Stage</a></li>
        <li class="dropdown">
          <a href="#" class="dropbtn">Offre par métier</a>
          <div class="dropdown-content">
            <a href="/offre?keyword=Developpement">Emploi  developpement</a>
            <a href="/offre?keyword=marketing">Emploi  marketing</a>
            <a href="/offre?keyword=ingenieur">Emploi ingenieur</a>
            <a href="/offre?keyword=Industrie">Emploi Industrie</a>

            <a href="/offre?keyword=Commerce">Emploi Commerce</a>

            <a href="/offre?keyword=Automobile">Emploi Automobile</a>

            <a href="/offre?keyword=Marketing">Emploi Marketing</a>

            <a href="/offre?keyword=Télécommunications">Emploi Télécommunications</a>

            <a href="/offre?keyword=Comptabilité">Emploi  Comptabilité</a>

            <a href="/offre?keyword=Electronique">Emploi Electronique</a>

            <a href="/offre?keyword=Assurances">Emploi Assurances</a>

            <a href="/offre?keyword=Mécanique">Emploi Mécanique</a>

            <a href="/offre?keyword=Pharmaceutiques">Emploi Pharmaceutiques</a>
          </div>
        </li>
        <li class="dropdown">
          <a href="#" class="dropbtn">Offre par Ville</a>
          <div class="dropdown-content emploi-par-ville ">
            <a href="/offre?location=mourouj">Emploi au mourouj</a>
            <a href="/offre?location=lac">Emploi à lac</a>
            <a href="/offre?location=Tunis">Emploi à Tunis</a>
            <a href="/offre?location=Kram">Emploi à Le Kram</a>

            <a href="/offre?location=Monastir">Emploi à Monastir</a>

            <a href="/offre?location=Soukra">Emploi à La Soukra</a>

            <a href="/offre?location=Ben Arous">Emploi à Ben Arous</a>

            <a href="/offre?location=Sahloul">Emploi à Sahloul</a>

            <a href="/offre?location=Megrine">Emploi à Megrine</a>

            <a href="/offre?location=Manouba">Emploi à Manouba</a>

            <a href="/offre?location=Mghira">Emploi à Zone Industrielle El Mghira</a>

            <a href="/offre?location=Bizerte">Emploi à Bizerte</a>

            <a href="/offre?location=Marsa">Emploi à La Marsa</a>

            <a href="/offre?location=Lafayette">Emploi à Lafayette</a>
          </div>
        </li>
        {role==="employee" ? <li><a href="/entretiens">Entretiens</a></li>:null}

      </ul>
      
      {isLoggedIn ? (
    <>
        
      
      <button className="btn-primary" onClick={goprofile} >Mon compte</button>
       
        
       
       
        <button className="btn-danger" onClick={handleLogout}>Déconnexion</button>


</>
       

      ) : (
        <>
         
          <button className='btn-primary' onClick={goregistre}>S'inscrire</button>
      
          
          <div className='log'>
         
            
          <button className='btn-primary' onClick={gologin}>Connexion</button>
     
     
          </div>
        </>
      )}


    </nav>

  );
}

export default Navbar;