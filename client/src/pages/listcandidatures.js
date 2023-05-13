import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../listcandidature.css'
const CandidatureList = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showNotif, setNotifForm] = useState(false);
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [codeAccess, setCodeAccess] = useState('');
  const [adresse, setAdresse] = useState('');
  const [documentsDemandes, setDocumentsDemandes] = useState('');
  const [message, setMessage] = useState('');
  const [numCandidats, setNumCandidats] = useState(0);
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [candidatePointer, setCandidatePointer] = useState(null);
  const [nomOffre, setNomOffre] = useState('');
  const [experienceCoefficient, setExperienceCoefficient] = useState(0.5);
  const [skillsCoefficient, setSkillsCoefficient] = useState(0.3);
  const [ageCoefficient, setAgeCoefficient] = useState(0.2);
  const [languesCoefficient, setLanguesCoefficient] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the offer
        const offreRes = await axios.get(`/api/offres/${id}`);
        const offre = offreRes.data;
        setNomOffre(offre.name);

        // Fetch all candidatures for the specified offer
        const res = await axios.get(`/api/offres/${id}/candidatures`);
        const candidatures = res.data;

        // Fetch candidat form data to get user id
        const candidatForm = await axios.get(`/api/candidatform`);
        const userId = candidatForm.data.UserId;

        // Fetch user data for each candidature
        const updatedCandidatures = await Promise.all(candidatures.map(async candidature => {
          if (candidature.name === userId) {
            // Add diplome and nombreannee properties from candidatForm
            candidature.diplome = candidatForm.data.diplome;
            candidature.nombreannee = candidatForm.data.nombreannee;
          } else {
            // Filter candidatForm data for the current candidature
            const filteredData = candidatForm.data.filter(item => item.UserId === candidature.name);
            if (filteredData.length === 0) {
              throw new Error(`No candidat form data found for candidature ${candidature.name}`);
            }
            // Add diplome and nombreannee properties from candidatForm
            candidature.diplome = filteredData[0].diplome;
            candidature.nombreannee = filteredData[0].nombreannee;
            candidature.experience_professionnelle = filteredData[0].experience_professionnelle;
            candidature.niveau_etude = filteredData[0].niveau_etude;
            candidature.universite = filteredData[0].universite;
            candidature.competences = filteredData[0].competences;
            candidature.langues = filteredData[0].langues;
            // Fetch user data for the candidature
            const res = await axios.get(`/api/users/${candidature.name}`);
            // Add user data to the candidature object
            candidature.firstname = res.data.Firstname;
            candidature.lastname = res.data.Lastname;
            candidature.Age = res.data.Age;
            candidature.Adress = res.data.Adress;
            candidature.Email = res.data.Email;
            const languesArray = candidature.langues.split(',').map(langue => langue.trim());
            const languesScore = languesArray.length * languesCoefficient;
            const skillsArray = candidature.competences.split(',').map(skill => skill.trim());
            const skillsScore = skillsArray.length * skillsCoefficient;
            const totalScore =
              experienceCoefficient * parseInt(candidature.nombreannee) +
              skillsScore + languesScore +
              ageCoefficient * parseInt(candidature.Age);
            candidature.totalScore = totalScore;
          }
          return candidature;
        }));
        updatedCandidatures.sort((a, b) => b.totalScore - a.totalScore);

        setCandidatures(updatedCandidatures);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, experienceCoefficient, skillsCoefficient, ageCoefficient,languesCoefficient]);

  const handleDelete = (candidatureId) => {
    axios.delete(`/api/offres/${id}/candidatures/${candidatureId}`)
      .then(res => {
        const updatedCandidatures = candidatures.filter(candidature => candidature._id !== candidatureId);
        setCandidatures(updatedCandidatures);
      })
      .catch(err => console.log(err));
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };
  const handlenotifShowForm = candidature => {
    setSelectedCandidature(candidature);
    setNotifForm(true);
  };
  const handleDetailsClick = candidature => {
    setShowDetails(true);
    setSelectedCandidature(candidature);
  };

  const handleCancel = () => {
    setNotifForm(false);
    setMessage('');
  };
  const handlenotifSubmit = async (event) => {
    event.preventDefault();
    try {
      const notification = {
        userId: selectedCandidature.name,
        message: message,

      };
      await axios.post('/api/notification', notification);
      setNotifForm(false);

      setMessage('');
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedCandidates = candidatures
        .slice(candidatePointer, candidatePointer + parseInt(numCandidats))
        .map((candidature) => candidature.name); // Get the names of the selected candidates

      const entretienRes = await axios.post(`/api/entretiens`, {
        type,
        date,
        offre: id,
        user: selectedCandidates,
        adresse,
        Documents_demandes: documentsDemandes,
        url,
        code_access: codeAccess,
      });

      const entretien = entretienRes.data;

      // Send notification to each user in the candidatures list
      const notificationPromises = candidatures
        .slice(candidatePointer, candidatePointer + parseInt(numCandidats))
        .map(async (candidature) => {
          const userRes = await axios.get(`/api/users/${candidature.name}`);
          const user = userRes.data;
          console.log(entretien.offre.name);
          let message = `Vous avez un entretien pour l'offre ${nomOffre} le ${entretien.date}.`;
          if (entretien.type === 'en_ligne') {
            message = message + ` Voici le lien de la réunion : ${entretien.url} et le code d'accès :${entretien.code_access}`;
          } else if (entretien.type === 'presentiel') {
            message = message + ` L'entretien aura lieu à l'adresse suivante : ${entretien.adresse}. Les documents demandés sont les suivants : ${entretien.Documents_demandes}.`;
          }
          const notificationRes = await axios.post('/api/notification', {
            message,
            userId: user._id,
          });
          return notificationRes.data;
        });
      const notifications = await Promise.all(notificationPromises);

      // Reset form state and fetch updated candidatures
      setDate('');
      setType('');
      setUrl('');
      setAdresse('');
      setCodeAccess("");
      setDocumentsDemandes("");
      setShowForm(false);
      if (candidatePointer + parseInt(numCandidats) >= candidatures.length) {
        setCandidatePointer(0);
      } else {
        setCandidatePointer(candidatePointer + parseInt(numCandidats));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section classname="candidat">
      <div className='container' >

        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="coefficients">
              <label>
                Experience coefficient:{' '}
                <input
                  type="number"
                  value={experienceCoefficient}
                  onChange={(e) => setExperienceCoefficient(parseFloat(e.target.value))}
                />
              </label>

              <label>
                Skills coefficient:{' '}
                <input
                  type="number"
                  value={skillsCoefficient}
                  onChange={(e) => setSkillsCoefficient(parseFloat(e.target.value))}
                />
              </label>
              <label>
                Age coefficient:{' '}
                <input
                  type="number"
                  value={ageCoefficient}
                  onChange={(e) => setAgeCoefficient(parseFloat(e.target.value))}
                />
              </label>
              <label>
                Langues coefficient:{' '}
                <input
                  type="number"
                  value={languesCoefficient}
                  onChange={(e) => setLanguesCoefficient(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <ul className="candidat-list">
              {candidatures.map(candidature => (
                <li className="candidat-preview" key={candidature._id}>

                  <div className="content float-left">
                    <h1 className="candidat-title">
                      {candidature.firstname} {candidature.lastname}
                    </h1>
                    <div >
                      <span className='badge bg-info'>
                        <i className="fas fa-bell" onClick={() => handlenotifShowForm(candidature)}></i>
                      </span>
                    </div>
                  </div>
                  <div className="data" >
                    <h5 className="companycandidat">
                      <img src={require("../sources/age.jpg")} width="80" height="80" />{candidature.Age}
                    </h5>
                    <h5 className="adresscandidat">
                      <img src={require("../sources/lieu.avif")} width="80" height="80" />{candidature.Adress}
                    </h5>
                  </div>
                  <div className="data" >
                    <h5 className="adresscandidat">
                      <img src={require("../sources/experience.gif")} width="120" height="110" />
                      {candidature.nombreannee}
                    </h5>


                  </div>
                  <div className="data" >
                    <h5 className="company">
                      <img src={require("../sources/universite.avif")} width="100" height="100" />{candidature.universite}
                    </h5>
                    <h5 className="adresscandidat">
                      <img src={require("../sources/diplome.jpg")} width="100" height="100" />{candidature.diplome}
                    </h5>
                    <h5 className="adresscandidat">
                      <img src={require("../sources/niveau.png")} width="50" height="80" />{candidature.niveau_etude}
                    </h5>
                    <div >
                      <span className="badge bg-danger " >
                        <i className="fas fa-trash" onClick={() => handleDelete(candidature._id)}></i>
                      </span>
                    </div>
                  </div>
                  <div className="data" >
                    <button clasName="company" onClick={() => window.location.href = `/offres/${id}/candidatures/${candidature._id}`}>Détail</button>
                  </div>

                </li>
              ))}
            </ul>

          </div>
        </div>
        <button className=" btn-success" onClick={handleShowForm} >
          Organiser entretien
        </button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <label>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <div className="form-group">
              <label>Number of Candidates:</label>
              <input type="number" value={numCandidats} onChange={(e) => setNumCandidats(e.target.value)} required />
            </div>

            <div>
              <label htmlFor="en_ligne">En ligne</label>
              <input type="radio" id="en_ligne" name="type" value="en_ligne" checked={type === "en_ligne"} onChange={(e) => setType(e.target.value)} />
              {type === "en_ligne" && (
                <div>
                  <label htmlFor="url">URL:</label>
                  <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                  <label htmlFor="code_access">Code d'accès:</label>
                  <input type="text" id="code_access" value={codeAccess} onChange={(e) => setCodeAccess(e.target.value)} />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="presentiel">Présentiel</label>
              <input type="radio" id="presentiel" name="type" value="presentiel" checked={type === "presentiel"} onChange={(e) => setType(e.target.value)} />
              {type === "presentiel" && (
                <div>
                  <label htmlFor="adresse">Adresse:</label>
                  <input type="text" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                  <label htmlFor="documents">Documents demandés:</label>
                  <input type="text" id="documents" value={documentsDemandes} onChange={(e) => setDocumentsDemandes(e.target.value)} />
                </div>
              )}
            </div>

            <button type="submit">Enregistrer</button>
          </form>
        )}
        {showNotif && (
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="card-body">

                <form onSubmit={(e) => handlenotifSubmit(e)}>

                  <label htmlFor="message">Message:</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="message"
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  <button type="submit" className=" btn-primary">
                    Send
                  </button>
                  <button
                    type="button"
                    className=" btn-secondary space"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>

        )}
      </div>

    </section>
  );
};

export default CandidatureList;