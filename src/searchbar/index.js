import React, {useState} from "react";
import {Link} from "react-router-dom";

const SearchBar = () => {

  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'search-bar':
        setSearch(event.target.value);
        return;
      case 'search-button':

        return;
      default:
        return;
    }
  }

  return(
      <div className="col">
        <input className="search-bar right-margin global-font" placeholder="Category" id="search-bar" type="text" value={search} onChange={handleChange}/>
        <Link to={"/products/categories/" + search}>
          <i className="fas fa-search text-color"></i>
        </Link>
      </div>


  )
}

export default SearchBar;