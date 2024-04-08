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
import ViewRsoCreateRequests from "./ViewRsoCreateRequests";

function HomeNavbar() {
  const navigate = useNavigate();
  const [showCreateUniProfileModal, setShowCreateUniProfileModal] =
    useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showRequestJoinRsoModal, setShowRequestJoinRsoModal] = useState(false);
  const [showRequestCreateRsoModal, setShowRequestCreateRsoModal] =
    useState(false);
  const [showViewRsoCreateRequests, setShowViewRsoCreateRequests] =
    useState(false);

  const role = localStorage.getItem("role");

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            ID: {localStorage.getItem("email")}, Role:{" "}
            {localStorage.getItem("role")}, Uni:{" "}
            {localStorage.getItem("university")}
          </Navbar.Brand>

          <DropdownButton id="dropdown-basic-button" title="Student">
            <Dropdown.Item onClick={() => setShowRequestJoinRsoModal(true)}>
              Request to join RSO
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setShowRequestCreateRsoModal(true)}>
              Request to create RSO
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton id="dropdown-basic-button" title="Admin">
            <Dropdown.Item
              onClick={() => setShowCreateEventModal(true)}
              disabled={role !== "Admin" && role !== "Super Admin"}
            >
              Create Event
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setShowCreateEventModal(true)}
              disabled={role !== "Admin" && role !== "Super Admin"}
            >
              View Requests to join RSO
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton id="dropdown-basic-button" title="S Admin">
            <Dropdown.Item
              onClick={() => setShowCreateUniProfileModal(true)}
              disabled={role !== "Super Admin"}
            >
              Create Uni Profile
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setShowViewRsoCreateRequests(true)}
              disabled={role !== "Super Admin"}
            >
              View Requests to create RSO
            </Dropdown.Item>
          </DropdownButton>

          <Button variant="danger" onClick={() => navigate("/login")}>
            Log out <i className="fa-solid fa-right-from-bracket"></i>
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
      <ViewRsoCreateRequests
        show={showViewRsoCreateRequests}
        onHide={() => setShowViewRsoCreateRequests(false)}
      />
    </div>
  );
}

export default HomeNavbar;
