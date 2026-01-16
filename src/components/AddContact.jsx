import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addContact } from "../services/api";
import { ContactContext } from "../context/ContactContext";

const AddContact = () => {
  const navigate = useNavigate();
  const { contacts, setContacts } = useContext(ContactContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      alert("All fields are required");
      return;
    }

    const res = await addContact({
      ...formData,
      createdAt: new Date().toISOString(),
    });

    setContacts([...contacts, res.data]);
    navigate("/");
  };

  return (
    <div className="add-contact">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">Save Contact</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddContact;
