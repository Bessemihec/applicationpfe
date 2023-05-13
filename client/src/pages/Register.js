import React, { useState } from 'react';
import '../Login.css';

import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
 
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const[message,setMessage]=useState("");

  const onChangeHandler = (e) => {
        
        
    setForm({
        
        ...form,
        [e.target.name]: e.target.value,
   
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // Check if the email already exists
      const Email = await axios.get(`/api/register?Email=${form.Email}`);
      if (Email.data.exists) {
        setMessage('Email exist déja');
        return;
      }
    
    const response = await axios.post('/api/register', form);
    
   
    
      console.log(response.data);
      setForm({});
      setMessage('');
      if (form.Role === 'employee') {
        window.location.href = '/offre';
      } else if (form.Role === 'candidat') {
        window.location.href = '/formulaire';
    }
  }
    catch (error) {
      console.error(error.response.data);
      setErrors(error.response.data);
      setMessage("utilisateur existe");
    }
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
						<h2>Inscription </h2>
					</div>
					<div class="row">
      <form onSubmit={handleSubmit} className="form-group">
      <div className="row">
      <label htmlFor="Email">Email</label>
                        <input
                            type="email"
                            name="Email"
                            placeholder="Entrez votre email"
                            onChange={onChangeHandler}
                            errors={errors.Email}
                            required
                            className="form__input"
                        />
                      
                      </div>
                    
                      <div className="row">
                        <label htmlFor="Firstname">Prénom</label>
                        <input
                            type="text"
                            
                            name="Firstname"
                            placeholder="Entrez votre nom "
                            onChange={onChangeHandler}
                            errors={errors.Firstname}
                            required
                            className="form__input"
                        />
                          </div>
                          <div className="row">
                      <label htmlFor="Lastname">Nom</label>
                        <input
                            type="text"
                           
                            name="Lastname"
                            placeholder="Entrez votre prénom "
                            onChange={onChangeHandler}
                            errors={errors.Lastname}
                            required
                            className="form__input"
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="password">mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Entrez votre mot de passe"
                            onChange={onChangeHandler}
                            
                            required
                            className="form__input"
                        />
                     
                  
                       
                     </div>

                     <div className="row">
                        <label htmlFor="Age">Age</label>
                        <input
                            type="text"

                            name="Age"
                            placeholder="Entrez votre age"

                            
                            onChange={onChangeHandler}
                            errors={errors.Age}
                            required
                            className="form__input"
                        />
                       
                 </div>
                 <div className="row">
                    <label htmlFor="Phone">Phone Number</label>
                        <input
                            type="tel"
                            
                            name="Phone"
                            placeholder="Entrez votre numéro de téléphone "
                            onChange={onChangeHandler}
                            errors={errors.Phone}

                            required
                            className="form__input"
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="Adress">Adress</label>
                        <input
                            type="text"
                            
                            name="Adress"
                            placeholder="Entrez votre address"
                            onChange={onChangeHandler}
                            errors={errors.Adress}

                            required
                            className="form__input"
                        />
                    </div>
                    <div className="row">
                    <div className="radio-buttons">

  <label htmlFor="Role">Role</label>
  <div>
    <label>
      <input
        type="radio"
        name="Role"
        value="candidat"
        onChange={onChangeHandler}
        checked={form.Role === "candidat"}
        required
      />
      Candidat
    </label>
    <label>
      <input
        type="radio"
        name="Role"
        value="employee"
        onChange={onChangeHandler}
        checked={form.Role === "employee"}
        required
      />
      Employee
    </label>
  </div>
</div>
</div>
       
                            <div class="row">
      <button className="bttn" type="submit">S'inscrire</button>
      {message && <div>{message}</div>}
      </div>
      </form>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
  }

export default Register;