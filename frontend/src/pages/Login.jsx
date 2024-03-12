import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
          <Navbar.Brand href="#home">Login </Navbar.Brand>
          <Button variant="primary" onClick={() => navigate("/signup")}>
            Nagivate to Sign Up
          </Button>
        </Container>
      </Navbar>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          onClick={() => navigate("/home")}
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
