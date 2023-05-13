import React from 'react';
import '../footer.css';



function Footerpage() {
  return (
   <div >
    
     <div className='foot'>
        
        
    <div className="row align-items-start">
        <div className="col">
            <h4>Accueil</h4>
            <ul>
              <li><a href="/">Page d'accueil</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Blog</a></li>
              
            </ul>
    </div>
            </div>
          <div>
          <div className="col-md-6">
            <h4>Contact</h4>
            <ul>
              <li><a href="#">Nous contacter</a></li>
              <li><a href="#">Support</a></li>
              
            </ul>
          </div>

          </div>
          <div>
          <div className="col-md-6">
            <h4>Nos partenaires</h4>
            <ul className="partners">
              <li><a href="#"><img src={require("../sources/money.png")} height={100} alt="Partner 1"/></a></li>
              <li><a href="#"><img src={require("../sources/solidarite.png")} height={100} alt="Partner 2"/></a></li>
              <li><a href="#"><img src={require("../sources/telecom.jpg")} height={100} alt="Partner 3"/></a></li>
             
            </ul>
          </div>
          </div>
        </div>

         <p className='p1'>© 2013 Powered by Poste tunisienne</p>
         
    </div>
   
  );
}

export default Footerpage;