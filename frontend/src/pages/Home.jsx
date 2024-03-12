import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="center">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">ID: </Navbar.Brand>
          <DropdownButton id="dropdown-basic-button" title="User">
            <Dropdown.Item href="#/action-1">Request to join RSO</Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              Request to create RSO
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Admin">
            <Dropdown.Item href="#/action-1">Create Event</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="S Admin">
            <Dropdown.Item href="#/action-1">Create Uni Profile</Dropdown.Item>
          </DropdownButton>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Log out
          </Button>
        </Container>
      </Navbar>
      <p>
        {" "}
        idea is that once user is created, the dropdowns they cannot access will
        be greyout out<br></br>
        TODO:<br></br>
        Create modals for each action
      </p>
    </div>
  );
}

export default Home;
