import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CandidatureDetail = () => {
    const { id, candidatureid } = useParams();
    const [candidature, setCandidature] = useState({});
    const [user, setUser] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the candidature data
                const candidatureRes = await axios.get(`/api/offres/${id}/candidatures/${candidatureid}`);
                const candidatureData = candidatureRes.data;
                setCandidature(candidatureData);

                // Fetch user data for each candidature
                const candidatForm = await axios.get(`/api/candidatform`);
                const userId = candidatureData.name;
                const document =candidatureData.diploma;
                if (userId === undefined) {
                    throw new Error('No candidature data found');
                }

                if (userId === null) {
                    throw new Error('No user data found for the candidature');
                }

                // Fetch the user data for the candidature
                const userRes = await axios.get(`/api/users/${userId}`);
                const userData = userRes.data;
                setUser(userData);

                // Filter candidatForm data for the current candidature
                const filteredData = candidatForm.data.filter(item => item.UserId === userId);

                if (filteredData.length === 0) {
                    throw new Error(`No candidat form data found for candidature ${userId}`);
                }

                // Add diplome and nombreannee properties from candidatForm
                setCandidature(candidature => ({
                    ...candidature,
                    diplome: filteredData[0].diplome,
                    nombreannee: filteredData[0].nombreannee,
                    experience_professionnelle: filteredData[0].experience_professionnelle,
                    niveau_etude: filteredData[0].niveau_etude,
                    universite: filteredData[0].universite,
                    competences: filteredData[0].competences,
                    emploi_desire: filteredData[0].emploi_desire,
                    titre_emploi_desire: filteredData[0].titre_emploi_desire,
                    salaire: filteredData[0].salaire,
                    status: filteredData[0].status,
                    lettre_motivation: filteredData[0].lettre_motivation,
                    langues: filteredData[0].langues,
                    nombreannee: filteredData[0].nombreannee,
                    Detail : filteredData[0].Detail,
                    Mission: filteredData[0].Mission,
                    document
                   
                }))
            }
      catch (err) {
                    console.log(err);
                }
            };

            fetchData();
        }, [id, candidatureid]);
        const handleRetourClick = () => {
            window.location.href = `/offres/${id}/candidatures`;
        };
    return (
        <div className="container candidature-detail">
            <h2>{user.Firstname} {user.Lastname}</h2>
            <p>Age: {user.Age}</p>
            <p>Phone: {user.Phone}</p>
            <p>Address: {user.Adress}</p>
            <h2>Candidature Details</h2>
            <h4>Intérêts professionnelle</h4>
            <p>Experience professionnelle: {candidature.experience_professionnelle}</p>
            <p>Type d'emploi désiré: {candidature.emploi_desire}</p>
            <p>Titre du poste désiré: {candidature.titre_emploi_desire}</p>
            <p>Salaire: {candidature.salaire}</p>
            <p>Status: {candidature.status}</p>
            <h4>Informations Générales</h4>
            <p>Lettre de motivation: {candidature.lettre_motivation}</p>
            <h4>Informations Professionelles</h4>
            <p>Competences: {candidature.competences}</p>
            <p>Langues: {candidature.langues}</p>
            <h4>Experience</h4>
            <p>Nombre d'annee d'experience: {candidature.nombreannee}</p>
            <p>Détails de l'expérience : Nom de la société / Entreprise {candidature.Detail} </p>
            <p>Titre de Poste - Mission: {candidature.Mission}</p>
            <p>document</p>
            <button onClick={handleRetourClick}>Retour</button>
        </div>
         
    );
};

export default CandidatureDetail;