import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../submitted-offers.css';
import ProfileBar from '../components/profilebar';

const SubmittedOffers = () => {
  const [submittedOffers, setSubmittedOffers] = useState([]);
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
  
  useEffect(async() => {
    const userId = await getUserId();
    console.log(userId)
    axios.get(`/api/users/${userId}/applied_offers`)
      .then(response => {
        console.log(response.data);
        setSubmittedOffers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const handleDelete = async(offerId) => {
    const userId = await getUserId();
    axios.delete(`api/users/${userId}/applied_offers/${offerId}`)
      .then(response => {
        setSubmittedOffers(submittedOffers.filter(offre => offre._id !== offerId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <section className="sumbitted">
      <ProfileBar/>
		<div className="container">
    
      <h1>Offres soumises</h1>
     
			<div className="row">
				<div className="col-md-10 offset-md-1">
					<ul className="job-list">
            {submittedOffers.map((offre) => (
						<li key={offre._id} className="job-preview">
							<div className="content float-left">
								<h4 className="job-title">
									{offre.name}
								</h4>
                <span className="badge bg-danger " >
        <i className="fas fa-trash" onClick={() => handleDelete(offre._id)}></i>
      </span>
								
							</div>
              <h5 className="company">
									{offre.lieu}
								</h5>
                
							<div className="offer-location">{offre.type}</div>
              
            </li>
            ))}
					</ul>
				</div>
			</div>
		</div>
	</section>
  );
};

export default SubmittedOffers;