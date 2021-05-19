import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function DeleteClientModal({ confirmDelete, closeModals }) {
  return (
    <>
      <Modal size="sm" centered show={true} onHide={confirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete this client?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModals}>
            Delete
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

DeleteClientModal.propTypes = {
  confirmDelete: PropTypes.func.isRequired,
  closeModals: PropTypes.func.isRequired,
};

export default DeleteClientModal;
