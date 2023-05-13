import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Router
} from "react-router-dom";



import Register from './pages/Register';


import HomePage from './pages/mainhome';


import UserList from './pages/ShowUser';

import UserProfile from './pages/Editprofile';
import MyForm from './pages/CandidatFormulare';

import Education from './pages/education';
import Experience from './pages/experience';
import Information from './pages/informationsgenerales';
import InformationProfessionelles from './pages/informationprofessionelles';
import UpdateUser from './pages/UpdateUsers';

import Footerpage from './components/footer';
import Navbar from './components/Navbar';
import Login from './pages/login';
import ProtectedRoute from './components/Protectedroutes';
import ChangePasswordPage from './pages/profile';
import OffresList from './pages/offres';
import OffreDetails from './pages/offredetails';
import AddOffre from './pages/Addoffres';
import EditOffre from './pages/updateoffre';
import CandidatureForm from './pages/Candidatureform';
import AddEntretien from './pages/ajouterentretiens';

import EntretienList from './pages/afficherentretien';
import EditEntretien from './pages/updateentretien';
import SubmittedOffers from './pages/submittedoffers';
import ShowForm from './pages/formulairecandidat';
import EditForm from './pages/EditForm';
import CandidatureList from './pages/listcandidatures';
import NotificationList from './pages/notification';
import BarChart from './components/charts';
import Chart from './components/charts';
import UserAgeChart from './components/charts';
import CandidatureDetail from './pages/candidaturedetail';


function App() {


  return (

    <BrowserRouter>
    <Navbar />
    <Routes>
       <Route path='/dashbord' element={<UserAgeChart/>}/>
       <Route path="/register" element={<Register />} />
       <Route path="/" element={<HomePage />} />
      <Route path="/User/:id" element={<UpdateUser/>}/>
      <Route path="/user" element={ <UserList /> }/>
      <Route path="/profile" element={<ProtectedRoute><SubmittedOffers /></ProtectedRoute>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/education" element={<ProtectedRoute><Education/></ProtectedRoute>}/>
       <Route path="/experience/:id" element={<ProtectedRoute><Experience/></ProtectedRoute>}/>
       <Route path="/experience/" element={<ProtectedRoute><Experience/></ProtectedRoute>}/>
        <Route path="/informationsgenerales/:id" element={<ProtectedRoute><Information/></ProtectedRoute>}/>
       <Route path="/informationsgenerales" element={<ProtectedRoute><Information/></ProtectedRoute>}/>
       <Route path="/changepassword/:userId" element={<ProtectedRoute><ChangePasswordPage/></ProtectedRoute>} />
       <Route  path="/formulaire" element={<ProtectedRoute><MyForm /></ProtectedRoute>} />
       <Route  path="/offres/:id/candidatures" element={<ProtectedRoute><CandidatureList /></ProtectedRoute>} />
       <Route  path="/offres/:id/candidatures/:candidatureid" element={<ProtectedRoute><CandidatureDetail  /></ProtectedRoute>} />
        <Route  path="/offre" element={ <OffresList /> }/>
       <Route exact path="/offres/:id" element={<OffreDetails/>} />
       <Route exact path="/offres/:id/edit" element={<ProtectedRoute><EditOffre/></ProtectedRoute>} />
       <Route  path="/addoffre" element={ <ProtectedRoute><AddOffre /></ProtectedRoute> }/>
       <Route path="/offres/:id/postuler" element={<ProtectedRoute><CandidatureForm/></ProtectedRoute>}/>
       <Route path="/informationsprofessionelles/:id" element={<ProtectedRoute><InformationProfessionelles/></ProtectedRoute>}/>
       <Route path="/informationsprofessionnelles" element={<ProtectedRoute><InformationProfessionelles/></ProtectedRoute>}/>
       <Route exact path="/entretiens" element={<ProtectedRoute><EntretienList/></ProtectedRoute>} />
       <Route path="/entretien/:id" element={<ProtectedRoute><EditEntretien/></ProtectedRoute>}/>
       <Route path="/addentretien" element={<ProtectedRoute><AddEntretien /></ProtectedRoute>}/>
      <Route path="/education/:id" element={<ProtectedRoute><Education/></ProtectedRoute>} />
      <Route path="/education" element={<ProtectedRoute><Education/></ProtectedRoute>} />
      <Route path="/profileuser" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
      <Route path="/candidatform" element={<ProtectedRoute><ShowForm/></ProtectedRoute>}/>
      <Route path="/edit-candidat-form" element={<ProtectedRoute><EditForm/></ProtectedRoute>}/>
      <Route path="/Notification" element={<ProtectedRoute><NotificationList/></ProtectedRoute>}/>
    </Routes>
    
    <Footerpage />
  </BrowserRouter>

  
  );
}

export default App;
