import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="center">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Sign up </Navbar.Brand>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Nagivate to Login
          </Button>
        </Container>
      </Navbar>

      <Form className="loginSignupForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <DropdownButton id="dropdown-basic-button" title="Status">
          <Dropdown.Item href="#/action-1">Student</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Admin</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Super Admin</Dropdown.Item>
        </DropdownButton>
        <Form.Text className="text-muted">
          You will be assigned a User ID once logged in<br></br>
        </Form.Text>
        <Button
          onClick={() => navigate("/home")}
          variant="primary"
          type="submit"
        >
          Create Account
        </Button>
      </Form>
    </div>
  );
}

export default Login;
