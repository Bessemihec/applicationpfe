import React, { useState } from "react";
import axios from "axios";
import "../addoffres.css";
import Alert from "../components/Alert";

const AddOffre = () => {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
   
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/offres', form)
    .then((res) => {
        setMessage(res.data.message);
        setForm({});
        setErrors({}); // clear any previous errors
       
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      })
        
    .catch(err => setErrors(err.response.data))
};


  

  return (
    
        
        <div class="container-fluid">
        <Alert message={message} show={show}/>
		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info">
				<span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
        <img src={require("../sources/poste.svg.png")} />
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid">
					<div class="row">
						<h2>Ajouter offre</h2>
					</div>
					<div class="row">
              <form onSubmit={handleSubmit} className="form-group">
              <div className="row">
                  <label htmlFor="type">Type</label>
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
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form__input"
                    placeholder="Enter name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="Description">Description</label>
                  <textarea
                    name="Description"
                    id="Description"
                    className={`form-control ${
                      errors.Description ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Description"
                    value={form.Description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.Description && (
                    <div className="invalid-feedback">
                      {errors.Description}
                    </div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="date">Date</label>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    className="form__input"
                    placeholder="Enter date"
                    value={form.date}
                    onChange={handleChange}
                  />
                  {errors.date && (
                    <div className="invalid-feedback">{errors.date}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="niveau_etude">Niveau d'étude</label>
                  <input
                    type="text"
                    name="niveau_etude"
                    id="niveau_etude"
                    className="form__input"
                    placeholder="Enter niveau d'étude"
                    value={form.niveau_etude}
                    onChange={handleChange}
                  />
                  {errors.niveau_etude && (
                    <div className="invalid-feedback">
                      {errors.niveau_etude}
                    </div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="salaire">Salaire</label>
                  <input
                    type="text"
                    name="salaire"
                    id="salaire"
                    className="form__input"
                    placeholder="Enter salaire"
                    value={form.salaire}
                    onChange={handleChange}
                  />
                  {errors.salaire && (
                    <div className="invalid-feedback">{errors.salaire}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="langues">Langues</label>
                  <input
                    type="text"
                    name="langues"
                    id="langues"
                    className="form__input"
                    placeholder="Enter langues"
                    value={form.langues}
                    onChange={handleChange}
                  />
                  {errors.langues && (
                    <div className="invalid-feedback">{errors.langues}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="lieu">Lieu</label>
                  <input
                    type="text"
                    name="lieu"
                    id="lieu"
                    className="form__input"
                    placeholder="Enter lieu"
                    value={form.lieu}
                    onChange={handleChange}
                  />
                  {errors.lieu && (
                    <div className="invalid-feedback">{errors.lieu}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="mot_cles">Mots clés</label>
                  <textarea
                    type="text"
                    name="mot_cles"
                    id="mot_cles"
                    className="form__input"
                    placeholder="Enter mots clés"
                    value={form.mot_cles}
                    onChange={handleChange}
                  />
                  {errors.mot_cles && (
                    <div className="invalid-feedback">{errors.mot_cles}</div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="date_dexpiration">Date d'expiration</label>
                  <input
                    type="text"
                    name="date_dexpiration"
                    id="date_dexpiration"
                    className="form__input"
                    placeholder="Enter date d'expiration"
                    value={form.date_dexpiration}
                    onChange={handleChange}
                  />
                  {errors.date_dexpiration && (
                    <div className="invalid-feedback">
                      {errors.date_dexpiration}
                    </div>
                  )}
                </div>
                <div className="row">
                  <label htmlFor="date_dexpiration">Nom d'entreprise</label>
                  <input
                    type="text"
                    name="entreprisenom"
                    id="entreprisenom"
                    className="form__input"
                    placeholder="Enter le nom de l'entreprise"
                    value={form.entreprisenom}
                    onChange={handleChange}
                  />
                   </div>
                  <div className="row">
                  <label htmlFor="date_dexpiration"> Comment Postuler ?</label>
                  <textarea
                    name="CommentPostuler"
                    id="CommentPostuler"
                    className="form__input"
                    placeholder="Enter la méthode d'application"
                    value={form.CommentPostuler}
                    onChange={handleChange}
                  />
                   </div>
                <div className="row">
                  <button type="submit" className="bttn btn-primary">
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
export default AddOffre;