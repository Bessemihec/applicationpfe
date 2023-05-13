import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser({ onCancel, data }) {
 
  const [form, setForm] = useState({});
  const {id} = useParams();
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});


  const onChangeHandler = (e) => {
        
    setForm({
        
        ...form,
        [e.target.name]: e.target.value,
    });
  
};

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    axios.put(`/api/users/${id}`, form)
    .then(res=>{
      navigate('/user')
    })
    .catch(err=>setErrors(err.response.data))
    
  }
  const handleCancel = () => {
    navigate('/user')
};


  useEffect(async () => {
    await axios.get(`/api/users/${id}`).then((res) => {
      setForm(res.data);
    });
  }, []);
  return (
  
            <form onSubmit={onSubmitHandler}>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="Email">Email</label>
                        <input
                            type="email"
                            name="Email"
                            placeholder="Entrer l' email"
                            onChange={onChangeHandler}
                            errors={errors.Age}
                            value={form.Email}
                            required
                        />
                       


                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="Firstname">Prénom</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Firstname"
                            placeholder="Entrer le prénom"
                            onChange={onChangeHandler}
                            value={form.Firstname}
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
                            value={form.Lastname}
                            errors={errors.Lastname}
                            required
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="Age">Age</label>
                        <input
                            type="text"

                            name="Age"
                            placeholder="Entrer l'age"
                            value={form.Age}       
                            
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
                            placeholder="Entrer le numéro de téléphone"
                            value={form.Phone}
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
                            placeholder="Entrer l' adress"
                            value={form.Adress}
                            onChange={onChangeHandler}
                            errors={errors.Adress}

                            required
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="Adress">Role</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Role"
                            placeholder="Entrer le role"
                            value={form.Role}
                            onChange={onChangeHandler}
                            errors={errors.Role}
                
                            required
                        />
                    </div>
                  

                    
                </div>
                <div className="form-group">
                    <button type="submit" className=" btn-primary">
                        Submit
                    </button>
                    <button
                        type="button"
                        className=" btn-secondary ml-2"
                        onClick={handleCancel}
                    >
                       Annuler
                    </button>

                </div>
            </form>
            
  
                        
  )
                        }
                    

export default UpdateUser;