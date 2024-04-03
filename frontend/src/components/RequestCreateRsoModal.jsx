import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

function RequestCreateRsoModal({ show, onHide }) {
  const [rsoName, setRsoName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [otherEmails, setOtherEmails] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rsoName || !adminEmail || !otherEmails) {
      setErrorMessage("Please make sure all fields are filled out correctly.");
      setShowAlert(true);
      return;
    }

    const data = {
      user_id: localStorage.getItem("email"),
      rso_name: rsoName,
      administrator_email: adminEmail,
      emails: otherEmails,
    };

    const response = await fetch("http://localhost:3000/rso_create_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response_txt = await response.json();

    if (response.ok) {
      onHide();
      window.location.reload();
    } else {
      setErrorMessage(response_txt.message);
      setShowAlert(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Request to create an RSO</Modal.Title>
        </Modal.Header>
        {showAlert && <Alert variant="danger">{errorMessage}</Alert>}
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>RSO Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name of RSO"
                value={rsoName}
                onChange={(e) => setRsoName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>To be administrator email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email of who will be the admin of this RSO"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter at least 4 other email addresses</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={otherEmails}
                onChange={(e) => setOtherEmails(e.target.value)}
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

export default RequestCreateRsoModal;
