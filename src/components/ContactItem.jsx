import React, { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import EditModal from "./EditModal";

const ContactItem = ({ contact, index }) => {
  const { deleteContact } = useContext(ContactContext);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(contact.id);
    }
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{contact.firstName}</td>
        <td>{contact.lastName}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td>
          <button
            className="btn btn-sm btn-info me-2"
            onClick={() => alert(JSON.stringify(contact, null, 2))}
            title="Show"
          >
            <i className="fa fa-eye"></i>
          </button>
          <button
            className="btn btn-sm btn-secondary me-2"
            onClick={() => setShowEditModal(true)}
            title="Edit"
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
            title="Delete"
          >
            <i className="fa fa-times"></i>
          </button>
        </td>
      </tr>

      {showEditModal && (
        <EditModal contact={contact} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
};

export default ContactItem;
