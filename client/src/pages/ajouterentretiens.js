import React, { useState } from 'react';
import axios from 'axios';
import "../ajouterentretien.css"
const AddEntretien = () => {
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [offre, setOffre] = useState('');
    const [user, setUser] = useState('');
    const [description, setDescription] = useState('');
  
    const handleTypeChange = (event) => {
      setType(event.target.value);
    };
  
    const handleDateChange = (event) => {
      setDate(event.target.value);
    };
  
    const handleOffreChange = (event) => {
      setOffre(event.target.value);
    };
  
    const handleUserChange = (event) => {
      setUser(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const newEntretien = { type, date, offre, user, description };
      axios.post('/api/entretiens', newEntretien)
        .then((res) => {
          console.log(res.data);
          setType('');
          setDate('');
          setOffre('');
          setUser('');
          setDescription('');
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    return (
      <div class="container-fluid">
		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info">
				<span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
        
        <img src={require("../sources/poste.svg.png")} />
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid">
					<div class="row">
						<h2>Ajouter entretien </h2>
					</div>
					<div class="row">
        <form onSubmit={handleSubmit} className="form-group">
        <div className="row">
          <label htmlFor="type">Type:</label>
          <input type="text" className="form__input" id="type" value={type} onChange={handleTypeChange} />
             </div>
             <div className="row">
          <label htmlFor="date">Date:</label>
          <input type="text" className="form__input" id="date" value={date} onChange={handleDateChange} />
          </div>
          <div className="row">
          <label htmlFor="offre">Offre ID:</label>
          <input type="text" className="form__input" id="offre" value={offre} onChange={handleOffreChange} required/>
          </div>
          <div className="row">
          <label htmlFor="user">User ID:</label>
          <input type="text" id="user" className="form__input" value={user} onChange={handleUserChange} required/>
            </div>
            <div className="row">
          <label htmlFor="description">Description:</label>
          <textarea id="description"className="form__input"  value={description} onChange={handleDescriptionChange} />
          </div>
          <div class="row">
          <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  };
  
  export default AddEntretien;