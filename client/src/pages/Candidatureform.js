import React, { useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import Alert from "../components/Alert";

import "../candidature.css";

const CandidatureForm = () => {
  const getUserId = async()=>{
    try {
    const response = await fetch('/api/protected', {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      
    });
    const userId = response.headers.get('userId');
      return userId
}catch{
  console.log("erreur")
}
  }
  const userId = getUserId();
  console.log(userId);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [diploma, setDiploma] = useState('');
  const { id } = useParams();
  const [form, setForm] = useState({});
  let Id=0;
  const onChangeHandler = async(e) => {
    const response =  await fetch('/api/protected', {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
})


Id = response.headers.get('userId')
   
  setForm({
      
    ...form,
    [e.target.name]: e.target.value,
    name:Id
});
setDiploma(e.target.files[0]);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/offres/${id}/candidatures`, form)
      .then(async(response) => {
        const candidature = response.data;
        const offerId = id // extract the offer ID from the response
        const userId = await getUserId();
        axios.put(`/api/users/${userId}/apply`, { offerId })
          .then((response) => {
            const updatedAppliedOffers = response.data;
            setAppliedOffers(updatedAppliedOffers);
            setForm({});
            setMessage('Diplôme soumis avec succès');
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 4000);
          })
          .catch((error) => {
            console.log(error);
            setMessage('Déjà soumis ');
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 4000);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="candidature-form-container">
       <Alert message={message} show={show}/>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"></label>
          <input
            type="text"
            className="form-control"
            name="name"
           
            onChange={onChangeHandler}
            hidden
          />
        </div>
        <div className="form-group">
          <label htmlFor="diploma">Déposer les documents demandés</label>
          <input
            type="file"
            className="form-control"
            id="diploma"
           name="diploma"
            onChange={onChangeHandler}
            require
          />
          
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CandidatureForm;