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


  return (
    <div className={styles.container}>
      <div className={styles.contents}>
      {searchField}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setTerm: PropTypes.func.isRequired,
};

export default SearchBar;