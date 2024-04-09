import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

function RequestJoinRsoModal({ show, onHide }) {
  const [rsoName, setRsoName] = useState("");
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!email|| !rsoName)
    {
      setErrorMessage("Please fill out all fields");
      setShowAlert(true);
      return;
    }


    const data = {
      rso_name: rsoName,
      email: email 
    }
    console.log(data.rso_name);
    const responseJoinRequest = await fetch("http://localhost:3000/request_to_join_rso",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    if (responseJoinRequest.ok)
    {
      onHide();
      //window.location.reload();
    }
    else{
      return;
    }
  };
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Request to join an RSO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>RSO Name</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Enter name of RSO"
                value ={rsoName}
                onChangeCapture={(e) => setRsoName(e.target.value)} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default RequestJoinRsoModal;
