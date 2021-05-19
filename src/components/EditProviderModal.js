import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function EditProviderModal({ handleClose, provider, saveEditedProvider }) {
  const [editedProvider, setEditedProvider] = useState(provider);
  const saveChanges = () => {
    if (!editedProvider) {
      return;
    }
    saveEditedProvider(editedProvider);
    handleClose();
  };
  const handleChange = (e) => [
    setEditedProvider({
      ...editedProvider,
      name: e.target.value,
    }),
  ];
  return (
    <>
      <Modal size="sm" show={true} centered>
        <Modal.Header>
          <Modal.Title style={{ color: "#17a2b8" }}>Edit Provider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={editedProvider.name} onChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={saveChanges}>
            Save Changes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

EditProviderModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  provider: PropTypes.object.isRequired,
  saveEditedProvider: PropTypes.func.isRequired,
};
export default EditProviderModal;
