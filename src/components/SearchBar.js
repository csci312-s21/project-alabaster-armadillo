import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/SearchBar.module.css";

function SearchBar({ searchTerm, setTerm }) {
  const searchField = (
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(event) => {
        setTerm(event.target.value);
      }}
    />
  );

  /*const sortTool = (
    <select
      className={styles.select}
      value={sortType}
      onChange={(event) => {
        setType(event.target.value);
      }}
    >
      <option value="firstName">First name</option>
      <option value="lastName">Last name</option>
      <option value="post">Keyword</option>
    </select>
  );8?

  /*const direction = (
    <span className={styles.arrow} onClick={() => {setDirection(!ascending);}}>{ascending ? "▲" : "▼"}</span>
    
  );*/

  return (
    <div className={styles.container}>
      {searchField}
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setTerm: PropTypes.func.isRequired,
};

export default SearchBar;
