import React, { useState, useEffect } from 'react';
import "../showform.css"
import ProfileBar from '../components/profilebar';

const ShowForm = () => {
  const [candidatForm, setCandidatForm] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  let Id=0;

  useEffect(() => {
    const getCandidatForm = async () => {
      try {
        const response = await fetch('/api/candidatform', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch candidat form data');
        }
        const res =  await fetch('/api/protected', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
      })
      
      
      Id = res.headers.get('userId')   

        const data = await response.json();
        // filter candidat form data for the user who is authenticated
        const filteredData = data.filter(candidatForm=> candidatForm.UserId == Id);
        if (filteredData.length === 0) {
          throw new Error('No candidat form data found for the authenticated user');
        }

        setCandidatForm(filteredData[0]);
        setPhotoUrl(filteredData[0].photo);
      } catch (error) {
        console.error(error);
        // redirect to error page
       
      }
    };

    getCandidatForm();
  }, []);

  if (!candidatForm) {
    return <div>Loading...</div>;
  }
  const handleEditClick = () => {
    window.location.href = "/edit-candidat-form"; // redirect to candidat form edit page
  }
  return (
    <div class="containercandidat">
      <ProfileBar/>
  <div class="candidatform">
    <div class="about">
      <span class="position">Le formulaire de candidature </span>
    </div>
  </div>
  <div class="details">
    <div class="section">
      <div class="section__title">Experience</div>
      <div class="section__list">
        <div class="section__list-item">
          <div class="left">
            <div class="name"><strong>Nombre d'années : </strong>{candidatForm.nombreannee}</div>
            <div class="addr"><strong>Nom de la société / Entreprise: </strong>{candidatForm.Detail}</div>
            <div class="duration"><strong>Mission: </strong>{candidatForm.Mission}</div>
            <div class="name"><strong>Description</strong></div>
            <div class="desc">{candidatForm.Description}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__title">Education</div>
      <div class="section__list">
        <div class="section__list-item">
          <div class="left">
            <div class="name"><strong>{candidatForm.universite}</strong></div>
            <div class="addr"><strong>Niveau d'étude:</strong> {candidatForm.niveau_etude}</div>
            <div class="duration"><strong>Diplôme:</strong> {candidatForm.diplome}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__title">Intérêts Professionnels</div> 
      <div class="section__list">
        <div class="section__list-item">
          <div class="name"><strong>Expérience professionnelle:</strong></div>
          <div class="text">{candidatForm.experience_professionnelle}</div>
        </div>
        <div class="section__list-item">
          <div class="name"><strong>Type d'emploi désiré</strong></div>
          <div class="text">{candidatForm.emploi_desire}</div>
        </div>
        <div class="section__list-item">
          <div class="name"><strong>Titre du poste désiré</strong></div>
          <div class="text">{candidatForm.titre_emploi_desire}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__title">Informations Professionelles</div>
      <div class="skills">
        <div class="skills__item">
          
            <div class="name"><strong>langues:</strong>{candidatForm.langues}</div>
         
        </div>
        <div class="skills__item">
         
            <div class="name"><strong>Compétences:</strong> {candidatForm.competences}</div>
          
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__title">Informations Générales</div>
      <div class="section__list">
        <div class="section__list-item">
          {candidatForm.lettre_motivation}
          
        </div>
        <div class="section__list-item">
      Photo: <img src={photoUrl}/>

        </div>
      </div>
    </div>
    <span className="badge bg-success " >
        <i className="fas fa-edit" onClick={handleEditClick}></i>
      </span>
  </div>
</div>
  );
};

export default ShowForm;