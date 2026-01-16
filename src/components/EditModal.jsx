import React, { useState, useContext, useEffect } from "react";
import { ContactContext } from "../context/ContactContext";

const EditModal = ({ contact, onClose }) => {
  const { updateContact } = useContext(ContactContext);
  const [formData, setFormData] = useState(contact);

  useEffect(() => {
    setFormData(contact);
  }, [contact]);

  if (!contact) return null;

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await updateContact(contact.id, formData);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Contact</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control mb-3" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control mb-3" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control mb-3" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control mb-3" required />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">Save changes</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
