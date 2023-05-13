import React, { useState, useEffect } from 'react';
import "../showform.css"
import ProfileBar from '../components/profilebar';
import axios from 'axios';

const EditForm = () => {
  const [candidatForm, setCandidatForm] = useState({
    nombreannee: "",
    Detail: "",
    Mission: "",
    Description: "",
    universite: "",
    niveau_etude: "",
    diplome: "",
    experience_professionnelle: "",
    emploi_desire: "",
    langues: "",
    competences: "",
    lettre_motivation: "",
    
  });

  const handleChange = (event) => {
    setCandidatForm({ ...candidatForm, [event.target.name]: event.target.value });
  }

  

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
      
      const Id = res.headers.get('userId')   

        const data = await response.json();
        console.log(candidatForm._id)
        // filter candidat form data for the user who is authenticated
        const filteredData = data.filter(candidatForm=> candidatForm.UserId == Id);
        if (filteredData.length === 0) {
          throw new Error('No candidat form data found for the authenticated user');
        }
         
        setCandidatForm(filteredData[0]);
      } catch (error) {
        console.error(error);
        // redirect to error page
       
      }
    };

    getCandidatForm();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/candidatform/${candidatForm._id}`,candidatForm, {
       
        headers: {
         
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ candidatForm }),
        
        
      });
      window.location.href = "/candidatform";
      if (!response.ok) {
        throw new Error('Failed to update candidat form data');
      }
      
    } catch (error) {
      console.error(error);
      // display error message to user
    }
  }
  return (
    <div class="containercandidat">
      <ProfileBar/>
  <div class="candidatform">
    <div class="about">
      <span class="position">Modifier le formulaire de candidature</span>
    </div>
  </div>
  <form onSubmit={handleSubmit}>
  <div class="details">
    <div class="section">
      <div class="section__title">Experience</div>
      <div class="section__list">
        <div class="section__list-item">
          <div class="left">
            <div class="name"><strong>Nombre d'années : </strong><input type="text" name="nombreannee" value={candidatForm.nombreannee} onChange={handleChange} /></div>
            <div class="addr"><strong>Nom de la société / Entreprise: </strong><input type="text" name="Detail" value={candidatForm.Detail} onChange={handleChange} /></div>
            <div class="duration"><strong>Mission: </strong><input type="text" name="Mission" value={candidatForm.Mission} onChange={handleChange} /></div>
            <div class="name"><strong>Description</strong></div>
            <div class="desc"><textarea name="Description" value={candidatForm.Description} onChange={handleChange} /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
    <div class="section__title">Education</div>
      <div class="section__list">
        <div class="section__list-item">
          <div class="left">
            <div class="name"><strong>Université</strong><input type="text" name="universite" value={candidatForm.universite} onChange={handleChange} /></div>
            <div class="addr"><strong>Niveau d'étude:</strong> <input type="text" name="niveau_etude" value={candidatForm.niveau_etude} onChange={handleChange} /></div>
            <div class="duration"><strong>Diplôme:</strong><input type="text" name="diplome" value={candidatForm.diplome} onChange={handleChange} /> </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__title">Intérêts Professionnels</div> 
      <div class="section__list">
        <div class="section__list-item">
          <div class="name"><strong> Expérience professionnelle:</strong></div>
          <div class="text"><input type="text" name="experience_professionnelle" value={candidatForm.experience_professionnelle} onChange={handleChange} /></div>
        </div>
        <div class="section__list-item">
          <div class="name"><strong>Type d'emploi désiré</strong></div>
          <div class="text"><input type="text" name="emploi_desire" value={candidatForm.emploi_desire} onChange={handleChange} /></div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__title">Informations Professionelles</div>
      <div class="skills">
        <div class="skills__item">
          
            <div class="name"><strong>langues:</strong></div>
            <div class="text"><textarea  name="langues" value={candidatForm.langues} onChange={handleChange} /></div>
        </div>
        <div class="skills__item">
         
            <div class="name"><strong>Compétences:</strong> </div>
            <div class="text"><textarea  name="competences" value={candidatForm.competences} onChange={handleChange} /></div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section__title">Informations Générales</div>
      <div class="section__list">
        <div class="section__list-item">
          
        <textarea  name="lettre_motivation" value={candidatForm.lettre_motivation} onChange={handleChange} />
        </div>
       
      </div>
    </div>
  </div>
  <div className="form-group">
  <button type="submit" className="btn btn-primary">
    Sauvegarder
  </button>
  </div>
  </form>
</div>
);
};
export default EditForm;