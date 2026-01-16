// ContactContext.js
import React, { createContext, useState, useEffect } from "react";
import { getContacts } from "../services/api";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContacts()
      .then(res => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateContact = (id, updatedData) => {
    setContacts(prev =>
      prev.map(contact => (contact.id === id ? { ...contact, ...updatedData } : contact))
    );
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <ContactContext.Provider value={{ contacts, loading, updateContact, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
