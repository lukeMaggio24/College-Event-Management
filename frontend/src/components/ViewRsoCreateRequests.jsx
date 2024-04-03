import React, { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ViewRsoCreateRequests({ show, onHide }) {
  const [requests, setRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/fetchrsorequests");
      const data = await response.json();
      setRequests(data);
    };

    if (show) {
      fetchData();
    }
  }, [show]);

  const handleAccept = (request) => {};

  const handleDeny = async (request) => {
    try {
      const response = await fetch(`http://localhost:3000/denyrequest`, {
        method: "DELETE",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: request.id }),
      });
      const data = await response.json();

      // Refresh the requests after deleting
      const refreshResponse = await fetch(
        "http://localhost:3000/fetchrsorequests"
      );
      const refreshData = await refreshResponse.json();
      setRequests(refreshData);
    } catch (error) {
      setErrorMessage("Error ", error);
      setShowAlert(true);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>RSO Create Requests</Modal.Title>
      </Modal.Header>
      {showAlert && <Alert variant="danger">{errorMessage}</Alert>}
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>RSO Name</th>
              <th>Admin/Creators Email</th>
              <th>Student Emails</th>
            </tr>
          </thead>
          <tbody>
            {requests &&
              requests.map((request, index) => (
                <tr key={index}>
                  <td>{request.rso_name}</td>
                  <td>{request.administrator_email}</td>
                  <td>{request.emails}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleAccept(request)}
                    >
                      Accept
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeny(request)}
                    >
                      Deny
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ViewRsoCreateRequests;
