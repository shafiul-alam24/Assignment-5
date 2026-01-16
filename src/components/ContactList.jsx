import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";  // <-- navigate ইমপোর্ট
import { ContactContext } from "../context/ContactContext";
import ContactItem from "./ContactItem";
import Filter from "./Filter";
import SearchBar from "./SearchBar";

const ContactList = () => {
  const navigate = useNavigate();  // <-- navigate হুক নিন
  const { contacts } = useContext(ContactContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("default");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    let filtered = contacts.filter(contact => {
      const fullText = `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`.toLowerCase();
      return fullText.includes(searchTerm.toLowerCase());
    });

    if (filter === "lastNameAsc") {
      filtered = filtered.sort((a, b) => a.lastName.localeCompare(b.lastName));
    }

    setFilteredContacts(filtered);
  }, [searchTerm, filter, contacts]);

  return (
    <div className="container py-5">
      <h2>All Contacts</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* Add New বাটনে navigate ব্যবহার */}
        <button
          className="btn btn-success"
          onClick={() => navigate("/add")}  // <-- ক্লিক করলে /add পেজে যাবে
        >
          <i className="fa fa-plus-circle"></i> Add New
        </button>
      </div>

      <Filter filter={filter} setFilter={setFilter} />

      <table className="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length ? (
            filteredContacts.map((contact, idx) => (
              <ContactItem key={contact.id} contact={contact} index={idx} />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Contact Information
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
