import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import CreateUniProfileModal from "../components/CreateUniProfileModal"; // Adjust the path as needed
import CreateEventModal from "../components/CreateEventModal";
import RequestJoinRsoModal from "../components/RequestJoinRsoModal";
import RequestCreateRsoModal from "../components/RequestCreateRsoModal";
import Form from "react-bootstrap/Form";

function HomeNavbar() {
  const navigate = useNavigate();
  const [showCreateUniProfileModal, setShowCreateUniProfileModal] =
    useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showRequestJoinRsoModal, setShowRequestJoinRsoModal] = useState(false);
  const [showRequestCreateRsoModal, setShowRequestCreateRsoModal] =
    useState(false);
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>ID: </Navbar.Brand>

          <DropdownButton id="dropdown-basic-button" title="User">
            <Dropdown.Item onClick={() => setShowRequestJoinRsoModal(true)}>
              Request to join RSO
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setShowRequestCreateRsoModal(true)}>
              Request to create RSO
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Admin">
            <Dropdown.Item onClick={() => setShowCreateEventModal(true)}>
              Create Event
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="S Admin">
            <Dropdown.Item onClick={() => setShowCreateUniProfileModal(true)}>
              Create Uni Profile
            </Dropdown.Item>
          </DropdownButton>

          <Button variant="primary" onClick={() => navigate("/login")}>
            Log out
          </Button>
        </Container>
      </Navbar>
      <RequestJoinRsoModal
        show={showRequestJoinRsoModal}
        onHide={() => setShowRequestJoinRsoModal(false)}
      />
      <RequestCreateRsoModal
        show={showRequestCreateRsoModal}
        onHide={() => setShowRequestCreateRsoModal(false)}
      />
      <CreateEventModal
        show={showCreateEventModal}
        onHide={() => setShowCreateEventModal(false)}
      />
      <CreateUniProfileModal
        show={showCreateUniProfileModal}
        onHide={() => setShowCreateUniProfileModal(false)}
      />
    </div>
  );
}

export default HomeNavbar;
