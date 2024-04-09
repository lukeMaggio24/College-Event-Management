import React, { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

function ViewRsoJoinRequests({ show, onHide }) {
    const [requests, setRequests] = useState([]);
    const [errorMessage, serErrorMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/fetch_RSO_join_request");
            const data = await response.json();
            setRequests(data);
        };

        if(show) {
            fetchData();
        }
    }, [show]);

    const handleAccept = async (value) => {
        const response = await fetch("http://localhost:3000/accept_RSO_join_request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rso_name: value.rso_name,
                email: value.email,
            }),
        });
        if(response.ok)
        {
            handleDeny(value);
        }
        
    };

    const handleDeny = async (value) => {
        try {
            const response = await fetch("http://localhost:3000/deny_RSO_join_request", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: value.id,
                }),
            });

            const refreshResponse = await fetch(
                "http://localhost:3000/fetch_RSO_join_request"
            );
            const refreshData = await refreshResponse.json();
            setRequests(refreshData);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="1g">
            <Modal.Header closeButton>
                <Modal.Title>RSO Join Requests</Modal.Title>
            </Modal.Header>
            {showAlert && <Alert variant="danger">{errorMessage}</Alert>}
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>RSO Name</th>
                            <th>Student Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests &&
                            requests.map((value, index) => (
                                <tr key={index}>
                                    <td>{value.rso_name}</td>
                                    <td>{value.email}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            onClick={() => handleAccept(value)}
                                        >
                                            Accept
                                        </Button>{" "}
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeny(value)}
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
export default ViewRsoJoinRequests;