import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search contacts..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} // key: call setSearchTerm on input change
    />
  );
};

export default SearchBar;
