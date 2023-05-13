import React , { useState }from 'react';
import '../HomePage.css';
import Sliding from '../components/slider';
import Register from './Register';
import "slick-carousel/slick/slick.css";
import { Link } from 'react-router-dom';
import Pagefooter from '../components/footer';
import axios from 'axios';
import "../slider.css"
import SearchBar from '../components/searchbar';
import Footer from '../components/footer';
import "../footer.css"
import Footerpage from '../components/footer';
import Sidebar from '../components/Sidebar';
import Offres from '../components/lastoffre';

import BarChart from '../components/charts';



const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/contacts', formData)
      .then(response => {
        // handle success
        console.log(response.data);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
  return (
    <div className="homepage">
 <Sliding />
      <SearchBar />
      
 <Offres />

      <h1>Parcourir les offres par ville</h1>
      <div className="container text-center">
        <div className="row align-items-start" >
          <div className="col" >
            <h2>Sousse</h2>
            <Link to="/offre?location=Sousse" ><img className="location" src={require("../sources/sousse.jpg")} /> </Link><br />
          </div>


          <div className="col" >
            <h2>Ben arous</h2>
            <Link to="/offre?location=Ben Arous" ><img className="location" src={require("../sources/Ben_arous.jpg")} /> <br /></Link>
          </div>


          <div className="col" >
            <h2>Lac</h2>
            <Link to="/offre?location=lac" ><img className="location" src={require("../sources/lac.jpg")} /> <br /></Link>
          </div>
          <div className="col" >
            <h2>Mourouj</h2>
            <Link to="/offre?location=mourouj" ><img className="location" src={require("../sources/mourouj.jpg")} /> <br /></Link>
          </div>
          <div className="col" >
            <h2>Ennaser</h2>
            <Link to="/offre?location=Ennasr" ><img className="location" src={require("../sources/Ennaser.jpg")} /> <br /></Link>
          </div>

          <div className="col" >
            <h2>Sfax</h2>
            <Link to="/offre?location=Sfax" ><img className="location" src={require("../sources/sfax.jpg")} /> <br /></Link>
          </div>
        </div>
        </div>
        <h1>Parcourir les offres par catégorie</h1>
        <div className="container text-center">
          <div className="row align-items-start" >
            <div className="col" >
              <h2>Industriel</h2>
              <Link to="/offre?keyword=Industrie" ><img className="location" src={require("../sources/industrie.jpg")} /> </Link><br />
            </div>


            <div className="col" >
              <h2>Developpement</h2>
              <Link to="/offre?keyword=Developpement" ><img className="location" src={require("../sources/dev.jpg")} /> <br /></Link>
            </div>
            <div className="col" >
              <h2>Marketing</h2>
              <Link to="/offre?keyword=Marketing" ><img className="location" src={require("../sources/marketing.png")} /> <br /></Link>
            </div>
            <div className="col" >
              <h2>Ingenieur</h2>
              <Link to="/offre?keyword=Ingenieur" ><img className="location" src={require("../sources/ingenieur.jpg")} /> <br /></Link>
            </div>

            <div className="col" >
              <h2>Gestion</h2>
              <Link to="/offre?keyword=Gestion" ><img className="location" src={require("../sources/gestion.jpg")} /> </Link><br />
            </div>
            <div className="col" >
              <h2>Design</h2>
              <Link to="/offre?keyword=Design" ><img className="location" src={require("../sources/design.avif")} /> </Link><br />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <div className="left-side">
              <div className="address details">
                <i className="fas fa-map-marker-alt"></i>
                <div className="topic">Address</div>
                <div className="text-one">Mourouj, Ben arous</div>
                <div className="text-two">Tunis Tunisie</div>
              </div>
              <div className="phone details">
                <i className="fas fa-phone-alt"></i>
                <div className="topic">Phone</div>
                <div className="text-one">+216 24988746</div>
                <div className="text-two">+ 216 26745373</div>
              </div>
              <div className="email details">
                <i className="fas fa-envelope"></i>
                <div className="topic">Email</div>
                <div className="text-one">bessemayedi26@gmail.com</div>
                <div className="text-two">sindatrifi2020@gmail.com</div>
              </div>
            </div>
            <div className="right-side">
              <div className="topic-text">Envoyez-nous un message</div>
              <p>Si vous avez des travaux pour moi ou des questions liées à mes tutoriels, vous pouvez m'envoyer un message à partir d'ici. C'est un plaisir de vous aider</p>
              <form onSubmit={handleSubmit}>
      <div className="input-box">
        <input
          type="text"
          placeholder="Entrez votre nom"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Entrez votre email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="input-box message-box">
        <textarea
          type="text"
          placeholder="Entrez votre message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="button1">
        <input type="submit" value="Envoyez" />
      </div>
    </form>
             
            </div>
          </div>
        </div>
        
        <div className='paragraphe'><strong>Recruit master</strong> est un  site d'emploi en Tunisie et le leader du marché de recrutement en ligne depuis sa création. Nous proposons des offres d'emploi dans toutes les régions du pays ainsi qu'à l'étranger, et les mettons à jour quotidiennement. Notre site d'emploi offre à tous les candidats la possibilité de trouver le travail qui correspond le mieux à leur profil en mettant à jour leur CV en ligne, en cherchant des offres d'emploi et en rédigeant un CV efficace qui met en avant leurs expériences et leurs atouts.

Si vous cherchez un travail dans l'une des régions de la Tunisie ou à l'étranger, <strong>Recruit master</strong> vous propose en permanence des annonces d'emploi pour des postes vacants dans votre domaine d'activité. Les entreprises informatiques en Tunisie ou Offshore, les centres d'appels, les bureaux et les cabinets de recrutement et d'intérim sont les recruteurs les plus actifs sur le site.

En plus de proposer des offres d'emploi, <strong>Recruit master</strong> dédie un espace pour les recruteurs qui cherchent des profils performants dans leurs secteurs d'activité. Vous trouverez également des annonces de formations en Tunisie sur notre site.

<strong>Recruit master</strong>, le portail tunisien de l'emploi, accompagne les candidats et les recruteurs pour un avenir meilleur ! Nous sommes déterminés à fournir à nos utilisateurs une expérience en ligne unique et efficace pour trouver le travail ou le candidat idéal. </div>



      </div>
      );
};


      export default HomePage;