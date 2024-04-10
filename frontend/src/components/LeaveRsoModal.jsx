import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

function LeaveRsoModal({ show, onHide }) {
  const [rsoName, setRsoName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rsoName) {
      setErrorMessage("Please make sure all fields are filled out correctly.");
      setShowAlert(true);
      return;
    }

    const response = await fetch(
      "http://localhost:3000/leaverso?rso_name=" +
        encodeURIComponent(rsoName) +
        "&email=" +
        localStorage.getItem("email")
    );

    const data = await response.json();

    if (
      response.status === 404 ||
      response.status === 500 ||
      response.status === 403
    ) {
      setErrorMessage(data.message);
      setShowAlert(true);
      return;
    }

    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Leave an RSO</Modal.Title>
        </Modal.Header>
        {showAlert && <Alert variant="danger">{errorMessage}</Alert>}
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>RSO Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name of RSO to Leave"
                value={rsoName}
                onChange={(e) => setRsoName(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LeaveRsoModal;
