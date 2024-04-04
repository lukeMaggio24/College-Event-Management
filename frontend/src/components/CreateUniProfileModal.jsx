import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "react-bootstrap/Alert";

function CreateUniProfileModal({ show, onHide }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [numOfStudents, setNumOfStudents] = useState("");
  const [universityDomain, setUniversityDomain] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleCreateUni = async (event) => {
    event.preventDefault();

    if (!name || !numOfStudents || !universityDomain) {
      setErrorMessage("Please make sure all fields are filled out correctly.");
      setShowAlert(true);
      return;
    }

    const response = await fetch("http://localhost:3000/createuni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, numOfStudents, universityDomain, description }),
    });

    const data = await response.json();

    if (response.ok) {
      onHide();
      window.location.reload();
    } else {
      setErrorMessage(data.message);
      setShowAlert(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create a university profile</Modal.Title>
        </Modal.Header>
        {showAlert && <Alert variant="danger">{errorMessage}</Alert>}
        <Modal.Body>
          <Form onSubmit={handleCreateUni}>
            <Form.Group className="mb-3">
              <Form.Label>University Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter University Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label># of Students</Form.Label>
              <Form.Control
                type="text"
                placeholder="Number of Students"
                value={numOfStudents}
                onChange={(e) => setNumOfStudents(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>University url</Form.Label>
              <Form.Control
                type="text"
                placeholder="@ucf.edu"
                value={universityDomain}
                onChange={(e) => (setUniversityDomain(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="my-form"
            onClick={handleCreateUni}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateUniProfileModal;
