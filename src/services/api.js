import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

// Named exports for API functions
export const getContacts = () => API.get("/contacts");
export const addContact = (data) => API.post("/contacts", data);
export const updateContact = (id, data) => API.put(`/contacts/${id}`, data);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);
