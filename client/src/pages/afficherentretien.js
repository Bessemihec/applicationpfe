import React, { useState, useEffect } from "react";
import axios from "axios";
import "../entretien.css"
import { Link } from "react-router-dom";
const EntretienList = () => {
    const [entretiens, setEntretiens] = useState([]);
    const [users, setUsers] = useState([]);
    const [offres, setOffres] = useState([]);
  
    useEffect(() => {
      const fetchEntretiens = async () => {
        try {
          const response = await axios.get("/api/entretiens");
          setEntretiens(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchUsers = async () => {
        try {
          const response = await axios.get("/api/users");
          setUsers(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchOffres = async () => {
        try {
          const response = await axios.get("/api/offres");
          setOffres(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchEntretiens();
      fetchUsers();
      fetchOffres();
    }, []);
  
    const getUserNames = (userIds) => {
      const names = userIds.map((userId) => {
        const user = users.find((user) => user._id === userId);
        return user ? `${user.Firstname} ${user.Lastname}` : "";
      });
      return names.join(", ");
    };
    const getOffreTitle = (offreId) => {
      const offre = offres.find((offre) => offre._id === offreId);
      return offre ? offre.name : "";
    };
    const handleDelete = async (entretienId) => {
      try {
        await axios.delete(`/api/entretiens/${entretienId}`);
        setEntretiens(entretiens.filter((e) => e._id !== entretienId));
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="entretiens-list-container">
        <h2>Liste des entretiens</h2>
        <table>
          <thead>
            <tr>
              <th>Candidats</th>
              <th>Offre</th>
              <th>Type</th>
              <th>Date</th>
              
              <th>Supprimer</th>
              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>
            {entretiens.map((entretien) => (
              <tr key={entretien._id}>
                <td>{getUserNames(entretien.user)}</td>
                <td>{getOffreTitle(entretien.offre)}</td>
                <td>{entretien.type}</td>
                <td>{entretien.date}</td>
                
                <td><span className="badge bg-danger mr-2" >
    <i className="fas fa-trash"onClick={() => handleDelete(entretien._id)}></i>
  </span>
               </td>
                <td>
                <Link to={`/entretien/${entretien._id}`} ><span className="badge bg-secondary mr-2" >
    <i className="fas fa-edit"></i>
  </span>
        
  </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

  export default EntretienList;