import React, { PureComponent } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import ProviderList from "./ProviderList";
import PropTypes from "prop-types";
import { isProviderExist } from "./../helpers/utils";

class AddNewClient extends PureComponent {
  state = {
    providerInput: "",
  };
  handleClick = () => {
    const { providerInput } = this.state;
    if (providerInput !== "") {
      if (isProviderExist(providerInput, this.props.providers)) {
        this.setState({
          providerInput: "*provider already exists",
        });
      } else {
        this.props.addNewProvider(providerInput);
        this.setState({
          providerInput: "",
        });
      }
    } else {
      this.setState({
        providerInput: "*name is required",
      });
    }
  };
  handleChange = (e) => {
    const input = e.target.value;
    this.setState({
      providerInput: input,
    });
  };
  render() {
    const {
      onClose,
      providers,
      deleteProvider,
      saveEditedProvider,
      handleChangeNewClientInfo,
      onCheck,
      selectedProviders,
      handleNewClientInfo,
      errors,
    } = this.props;
    const { providerInput } = this.state;
    return (
      <Modal show={true} centered>
        <Modal.Header>
          <Modal.Title style={{ color: "#17a2b8" }}>New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalName">
              <Form.Label column sm={2}>
                Name:
                {!!errors && errors.name && (
                  <span className="errors"> {errors.name} </span>
                )}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="name"
                  name="name"
                  onChange={handleChangeNewClientInfo}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Email:
                {!!errors && errors.email && (
                  <span className="errors"> {errors.email} </span>
                )}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChangeNewClientInfo}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalPhone">
              <Form.Label column sm={2}>
                Phone:
                {!!errors && errors.phone && (
                  <span className="errors"> {errors.phone} </span>
                )}
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="phone"
                  name="phone"
                  onChange={handleChangeNewClientInfo}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalProviders">
              <Form.Label column sm={2}>
                Providers:
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="providers"
                  value={providerInput}
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm={4}>
                <Button
                  variant="light"
                  onClick={this.handleClick}
                  disabled={selectedProviders.size > 0 ? true : false}>
                  Add Provider
                </Button>
              </Col>
            </Form.Group>
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label column sm={2}></Form.Label>
                <Col sm={8}>
                  <ProviderList
                    providers={providers}
                    deleteProvider={deleteProvider}
                    saveEditedProvider={saveEditedProvider}
                    onCheck={onCheck}
                    selectedProviders={selectedProviders}
                  />
                </Col>
              </Form.Group>
            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleNewClientInfo}>
            Add Client
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddNewClient.propTypes = {
  providers: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  addNewProvider: PropTypes.func.isRequired,
  deleteProvider: PropTypes.func.isRequired,
  saveEditedProvider: PropTypes.func.isRequired,
  handleNewClientInfo: PropTypes.func.isRequired,
  handleChangeNewClientInfo: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  selectedProviders: PropTypes.object,
  errors: PropTypes.object,
};

export default AddNewClient;
