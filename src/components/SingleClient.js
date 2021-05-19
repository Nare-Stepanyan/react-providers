import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function SingleClient({ newClient, showEditModal }) {
  let clientProvidersList = " ";
  if (newClient.providers.length > 0) {
    clientProvidersList = newClient.providers.map((el) => el.name).join(", ");
  }
  return (
    <tr>
      <td>{newClient.name}</td>
      <td>{newClient.email}</td>
      <td>{newClient.phone}</td>
      <td>{clientProvidersList}</td>
      <td>
        <Button variant="link" onClick={() => showEditModal(newClient)}>
          Edit
        </Button>
      </td>
    </tr>
  );
}

SingleClient.propTypes = {
  newClient: PropTypes.object.isRequired,
  showEditModal: PropTypes.func.isRequired,
};

export default SingleClient;
