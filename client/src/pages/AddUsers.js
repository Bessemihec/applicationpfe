import React, { useState, useEffect } from "react";
import axios from "axios";
import "../User.css";
import Alert from "../components/Alert";

const AddUser = ({ onSubmit, onCancel, data }) => {
    const [errors, setErrors] = useState({});
   
    const [form, setForm] = useState({});
   const[Role,setRole]=useState("employee");
    const [message, setMessage] = useState("");
    const [show, setShow] = useState(false);
   


    const onChangeHandler = (e) => {
        
        
        setForm({
            
            ...form,
            [e.target.name]: e.target.value,
            Role: "employee"
        });
      
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('/api/users', form)
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
   

    const handleCancel = () => {
        onCancel();
    };


   
   
   

   

 return (
    <div >
 <Alert message={message} show={show}/>
            <form onSubmit={handleSubmit}>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="Email">Email</label>
                        <input
                            type="email"
                            name="Email"
                            placeholder="Entrer email"
                            onChange={onChangeHandler}
                            errors={errors.Email}
                            required
                        />
                      

                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Firstname">Prénom</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Firstname"
                            placeholder="Entrer prénom"
                            onChange={onChangeHandler}
                            errors={errors.Firstname}
                            required
                        />

                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Lastname">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Lastname"
                            placeholder="Entrer le nom"
                            onChange={onChangeHandler}
                            errors={errors.Lastname}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Entrer le mot de passe"
                            onChange={onChangeHandler}
                            
                            required
                        />
                        </div>
                    

                    <div className="form-group col-md-6">
                        <label htmlFor="Age">Age</label>
                        <input
                            type="text"

                            name="Age"
                            placeholder="Entrer l'age"

                            
                            onChange={onChangeHandler}
                            errors={errors.Age}
                            required
                        />
                       
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="Phone">Numéro de téléphone</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="Phone"
                            placeholder="Entrer le Numéro de téléphone"
                            onChange={onChangeHandler}
                            errors={errors.Phone}

                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Adress">Adress</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Adress"
                            placeholder="Entrer l'adress"
                            onChange={onChangeHandler}
                            errors={errors.Adress}

                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        
                        <input
                            type="text"
                            className="form-control"
                            name="Role"
                            
                            defaultValue="employee"
                            onChange={onChangeHandler}
                           hidden
                            
                           
                            
                        />
                    

                </div>
                </div>
                <div className="form-group">
                    <button type="submit" className=" btn-primary">
                        Submit
                    </button>
                    <button
                        type="button"
                        className=" btn-secondary"
                        onClick={handleCancel}
                    >
                        Annuler
                    </button>
                </div>
                
            </form>
            </div>
            
        )
    }
    export default AddUser;