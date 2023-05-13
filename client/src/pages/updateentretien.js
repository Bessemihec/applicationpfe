import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import "../updateoffre.css"

const EditEntretien = () => {
  
  const { id } = useParams();

  const [form, setForm] = useState({});

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`/api/entretiens/${id}`)
      .then(response => {
        setForm(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/entretiens/${id}`, form)
      .then(response => {
        window.location.href =`/entretiens`;
      })
      .catch(error => {
        
         
        
        console.log(error);
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
						<h2>Update Entretien</h2>
					</div>
					<div class="row">
              <form onSubmit={handleSubmit} className="form-group">
                      <div className="row">

                  <label htmlFor="type">Type : </label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    className="form__input"
                    placeholder="Enter type"
                    value={form.type}
                    onChange={handleChange}
                  />
                  {errors.type && (
                    <div className="invalid-feedback">{errors.type}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="name">Date:</label>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    className="form__input"

                    placeholder="Enter name"
                    value={form.date}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                
                        
                        <div class="row">
                        <button type="submit" className=" btn-primary">
                            Submit
                        </button>
                        </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
</div>
                      );
};

export default EditEntretien;