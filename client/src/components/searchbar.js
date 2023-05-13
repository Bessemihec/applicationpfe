import React , { useState } from "react";
import "../searchbar.css" ;
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/offre?keyword=${keyword}&location=${location}`);
  };
  return (
   <div className="search">
      <form onSubmit={handleSubmit}  className="search-container">
     
  <div class="row">
    <div class="col">
        <input type="text" 
        name="keyword" 
        placeholder="Mot clés "
         value={keyword}
          onChange={(event) => setKeyword(event.target.value)} 
          className="in"/>
    </div>
    <div class="col">

        <input type="text" 
        name="location"
         placeholder="Lieu"
           value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="in"/>
              </div>
              <div class="col">

              <button type="submit" className="btn btn-outline-secondary ">
      <i className="fas fa-search"></i>
    </button>
        </div>
</div>

      </form>
      </div>
  );
}

export default SearchBar;