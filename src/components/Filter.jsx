// Filter.jsx
import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="d-flex align-items-center justify-content-between p-3">
      <div className="fs-4">
        <i className="fa fa-filter text-success"></i> Filter
      </div>
      <select
        className="form-select w-auto"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="firstNameAsc">First Name (A → Z)</option>
        <option value="lastNameAsc">Last Name (A → Z)</option>
        <option value="oldestFirst">Oldest To First</option>
      </select>
    </div>
  );
};

export default Filter;
