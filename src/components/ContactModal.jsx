import React, { useState, useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import { updateContact } from "../services/api";

const ContactModal = ({ contact, type, onClose }) => {
  const { contacts, setContacts } = useContext(ContactContext);

  const [formData, setFormData] = useState({
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    const res = await updateContact(contact.id, formData);
    const updatedContacts = contacts.map((c) =>
      c.id === contact.id ? res.data : c
    );
    setContacts(updatedContacts);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{type === "view" ? "Contact Details" : "Edit Contact"}</h3>

        {type === "view" ? (
          <>
            <p>
              <strong>First Name:</strong> {contact.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {contact.lastName}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <button onClick={handleUpdate}>Update</button>
          </>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ContactModal;
