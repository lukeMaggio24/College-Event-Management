import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

function RequestCreateRsoModal({ show, onHide }) {
  const [rsoName, setRsoName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [otherEmails, setOtherEmails] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rsoName || !adminEmail || !universityName || !otherEmails) {
      setErrorMessage("Please make sure all fields are filled out correctly.");
      setShowAlert(true);
      return;
    }

    const responseUniID = await fetch(
      "http://localhost:3000/fetchuni_id?name=" +
        encodeURIComponent(universityName)
    );
    if (responseUniID.status === 404) {
      setErrorMessage(
        "University name does not exist, please use the exact name"
      );
      setShowAlert(true);
      return;
    }
    const universityID = (await responseUniID.json()).id;
    console.log(universityID + " uni id <---");

    const responseUniDomain = await fetch(
      "http://localhost:3000/fetch_uni_domain?id=" +
        encodeURIComponent(universityID)
    );

    const responseUniDomainJson = await responseUniDomain.json();
    if (!responseUniDomainJson.university_domain) {
      setErrorMessage("Email domain not found");
      setShowAlert(true);
      return;
    }
    const uni_domain = responseUniDomainJson.university_domain.split("@")[1];

    const emails = otherEmails.split(/[\s,]+/);
    const domains = emails.map((email) => email.split("@")[1]);

    if (uni_domain != domains[0]) {
      setErrorMessage("Does not match Universities domain");
      setShowAlert(true);
      return;
    }
    const allSameDomain = domains.every((domain) => domain === domains[0]);
    const adminDomain = adminEmail.split("@")[1];

    const length = domains.length;
    if (length < 4) {
      setErrorMessage("You need at least 4 other students.");
      setShowAlert(true);
      return;
    }

    if (!allSameDomain || adminDomain != domains[0]) {
      setErrorMessage("All emails should have the same domain.");
      setShowAlert(true);
      return;
    }

    const data = {
      user_id: localStorage.getItem("email"),
      rso_name: rsoName,
      administrator_email: adminEmail,
      emails: otherEmails,
      initialNumOfMembers: length,
      UNI_ID: universityID,
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
              <Form.Label>Enter the Full University Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="University of Central Florida"
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
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
